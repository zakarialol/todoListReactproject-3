function Button({
  text = "",
  className = "",
  onClick,
  type = "button",
  animation,
  disabled,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={className}
      disabled={disabled}
    >
      {text}
      {animation}
    </button>
  );
}
export default Button;
