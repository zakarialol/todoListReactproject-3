
//svgs
import CalenderIcon from "@/components/icons/calenderIcon"
import ProfileIcon from "@/components/icons/ProfileIcon"
import LogOutIcon from "@/components/icons/logOutIcon"
import Button from "@/components/Ui/Button"
function OpenSideModale({className="",OpenSideModale}){
    const menuBtns = [{icon:<ProfileIcon/>,text:"profile"},{icon:<CalenderIcon/>,text:"calender"},{icon:<LogOutIcon/>,text:"log out"}]
    return (
       <div className={`${className} ${OpenSideModale && 'right-0'}`}>
            {menuBtns.map((btn)=>(
                <div className="flex gap-5 mb-1 px-8 py-3"><span className="cursor-pointer p-1">{btn.icon}</span> <Button text={btn.text} className="cursor-pointer p-1"/></div>
            ))}
       </div>
    )
}
export default OpenSideModale