function Button({ text = "", className = "", onClick, type = "button" }) {
  return (
    <button onClick={onClick} className={className}>
      {text}
    </button>
  );
}
export default Button;
