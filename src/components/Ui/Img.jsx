import DemoProfilePic from "@/assets/icons/profileImg.svg";
function Img({ img, className }) {
  console.log(img, "img");
  return (
    <div className={className}>
      <img
        className="w-full h-full object-cover"
        src={img || DemoProfilePic}
        alt="image"
      />
    </div>
  );
}
export default Img;
