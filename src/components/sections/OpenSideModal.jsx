
//svgs
import CalenderIcon from "@/components/icons/calenderIcon"
import ProfileIcon from "@/components/icons/ProfileIcon"
import LogOutIcon from "@/components/icons/logOutIcon"
import Button from "@/components/Ui/Button"
import SvgButton from "@/components/Ui/Svgbutton"
import XmarkIcon from "@/components/icons/Xmark"
//jsx
import Profile  from "./Profile"
function OpenSideModale({className="",OpenSideModale,setOpenSideModale}){
    const menuBtns = [{icon:<ProfileIcon/>,text:"profile",id:"1"},{icon:<CalenderIcon/>,text:"calender",id:"2"},{icon:<LogOutIcon/>,text:"log out",id:"3"}]
    return (
       <div className={`${className} ${OpenSideModale && 'right-0'}`}>
            <div className="text-end">
                <SvgButton svg={<XmarkIcon/>} className="mr-4 mt-4 hover:text-red-500" onclick={()=>{setOpenSideModale(false)}}/>
            </div>
            <Profile className="px-8 pb-7 border-b border-b-[#E2E4E5]"/>
            {menuBtns.map((btn)=>(
                <div key={btn.id} className="flex gap-3 mb-1 px-8 py-3"><span className="cursor-pointer p-1">{btn.icon}</span> <Button text={btn.text} className="cursor-pointer p-1 font-inter capitalize"/></div>
            ))}
       </div>
    )
}
export default OpenSideModale