import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import axiosInstance from "../../utils/axiosInstance";

export default function useLogin(t) {
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["token"]);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email(t("validation.email"))
      .required(t("validation.required")),
    password: yup
      .string()
      .required(t("validation.required"))
      .min(6, t("validation.min", { min: 6 })),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: submitLogin, isPending } = useMutation({
    mutationFn: async (data) => {
      const response = await axiosInstance.post("/auth/login", data);
      return response.data;
    },
    onSuccess: (data) => {
      if (data?.code === 200) {
        toast.success(t("auth.loginSuccess"));
        setCookie("token", data.data?.auth?.token, {
          path: "/",
          secure: true,
          sameSite: "Strict",
        });
        navigate("/profile");
      } else {
        toast.error(t("auth.loginFailed"));
      }
    },
    onError: (error) => {
      toast.error(error.message || t("auth.somethingWentWrong"));
    },
  });

  return {
    register,
    handleSubmit: handleSubmit(submitLogin),
    errors,
    isLoading: isPending,
  };
}
