function SvgButton({
  svg,
  onclick,
  type = "button",
  className = "",
  onMouseDown,
}) {
  return (
    <button
      type={type}
      className={className}
      onClick={onclick}
      onMouseDown={onMouseDown}
    >
      {svg}
    </button>
  );
}
export default SvgButton;
