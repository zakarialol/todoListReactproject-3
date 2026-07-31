// 
import Img from "@/components/Ui/Img"
import  Paragraph from "@/components/Ui/Paragraph"
//
function Profile({className=""}){
    return(
        <div className={className}>
                <Img className="w-16 h-16 bg-gray-300 rounded-full mb-5"/>
                <Paragraph className="font-inter font-bold text-[#0F0F0F] capitalize" text={"zakaria"} />
        </div>
    )
}
export default Profile
