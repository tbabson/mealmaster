import Wrapper from "../assets/wrappers/SectionTitle";

const SectionTitle = ({ title, description }) => {
  return (
    <Wrapper>
      <div className="section-title">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </Wrapper>
  );
};
export default SectionTitle;
