function InputWithTitle({ title, type, name, ...props }) {
  return (
    <div>
      <label htmlFor={title} className="block inputTitle">
        {title}
      </label>
      <input
        type={type}
        name={name}
        {...props}
        id={title}
        className="registerInput"
      />
    </div>
  );
}
export default InputWithTitle;
