const FormInput = ({ label, name, type, defaultValue, size }) => {
  return (
    <label className="form-label">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        className={`input ${size}`}
      />
    </label>
  );
};
export default FormInput;
