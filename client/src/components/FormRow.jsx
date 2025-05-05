const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
  required,
  value,
  handleChange,
}) => {
  // Determine if this is a controlled or uncontrolled input
  const isControlled = value !== undefined;

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      {isControlled ? (
        // Controlled input (using value + onChange)
        <input
          type={type}
          name={name}
          id={name}
          autoComplete="on"
          className="form-input"
          value={value}
          onChange={handleChange || onChange}
          required={!!required}
        />
      ) : (
        // Uncontrolled input (using defaultValue)
        <input
          type={type}
          name={name}
          id={name}
          autoComplete="on"
          className="form-input"
          defaultValue={defaultValue || ""}
          onChange={onChange}
          required={!!required}
        />
      )}
    </div>
  );
};

export default FormRow;
