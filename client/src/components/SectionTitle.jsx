import Wrapper from "../assets/wrappers/SectionTitle";

const SectionTitle = ({ title, description, className = "" }) => {
  return (
    <Wrapper>
      <div className={`section-title ${className}`}>
        <div className="section-title-container">
          {title && <h2>{title}</h2>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </Wrapper>
  );
};

export default SectionTitle;
