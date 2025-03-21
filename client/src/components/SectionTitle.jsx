import Wrapper from "../assets/wrappers/SectionTitle";

const SectionTitle = ({ title, description }) => {
  return (
    <Wrapper>
      <div className="section-title">
        <div className="section-title-container">
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
    </Wrapper>
  );
};
export default SectionTitle;
