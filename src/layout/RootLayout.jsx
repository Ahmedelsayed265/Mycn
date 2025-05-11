import { Outlet } from "react-router";
import Header from "../ui/layout/Header";
import Footer from "../ui/layout/Footer";

export default function RootLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
