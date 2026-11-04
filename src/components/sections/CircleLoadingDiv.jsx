import CircleLoadingAnimation from "../icons/CircleLoaingAnimation";
function CircleLoadingDiv({ className = "", svgCalass = "" }) {
  return (
    <div className={className}>
      <CircleLoadingAnimation className={svgCalass} />
    </div>
  );
}
export default CircleLoadingDiv;
