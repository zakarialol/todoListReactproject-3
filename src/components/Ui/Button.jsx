function Button({
  text = "",
  className = "",
  onClick,
  type = "button",
  animation,
}) {
  return (
    <button onClick={onClick} className={className}>
      {text}
      {animation}
    </button>
  );
}
export default Button;
