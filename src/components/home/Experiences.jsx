const ExperienceSection = ({ experiences, head }) => {
  return (
    <section className="experience-section text-center">
      <div className="shape-img">
        <img src="/images/bg.png" alt="shape" />
      </div>

      <div className="container">
        <div className="section-header">
          <p className="section_hint">{head.title}</p>
          <h2>{head.subtitle}</h2>
        </div>
        <div className="row">
          {experiences?.map((item, index) => (
            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
              <div className="experience-box">
                <div className="step-number">+ {item.count}</div>
                <div className="icon">
                  <img src={item.icon} alt={item.title} />
                </div>
                <h5>{item.title}</h5>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
