import DemoProfilePic from "@/assets/icons/profileIMg.svg"
function Img({img = DemoProfilePic,className}){
    return(
        <div className={className}>
            <img src={img} alt="image" />
        </div>
    )
}
export default Img