import './Input.scss';

function Input({
  label,
  type,
  customClass,
  name,
  handleChange,
  defaultValue,
  disabled,
  maxLength,
}) {
  const id = `input-${name}`;

  return (
    <section className="input">
      <label className="input__label">{label}</label>
      <input
        type={type}
        className={`input__field ${customClass ? customClass : ''}`}
        name={name}
        data-testid={label}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ''}
        maxLength={maxLength}
        disabled={disabled}
      />
    </section>
  );
}

export default Input;
