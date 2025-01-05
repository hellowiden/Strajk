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
      <label className="input__label" htmlFor={id}>
        {label}
      </label>
      <input
        type={type}
        className={`input__field ${customClass ? customClass : ''}`}
        id={id}
        name={name}
        onChange={handleChange}
        defaultValue={defaultValue ? defaultValue : ''}
        maxLength={maxLength}
        disabled={disabled}
      />
    </section>
  );
}

export default Input;
