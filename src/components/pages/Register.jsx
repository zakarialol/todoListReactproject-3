// icons
import Logo from "@/components/icons/Logo"
import Paragraph from "../Ui/paragraph"
//jsx 
import LogoAndTitle from "@/components/sections/LogoAndTitle"
import InputWithTitle from "@/components/sections/InputWithTitle"
import Button from "@/components/Ui/Button"
function Register(){

    return(
        
        <div className="px-6 pt-6 h-dvh">
            <LogoAndTitle logo={<Logo width="32" height="32"/>} title="askanote" className="flex gap-2 items-center mb-24"/>
            
            <div className="text-center">
                <Paragraph className="formTitle" text="create and account"/>
            </div>

            <form action="">
                <InputWithTitle title="full name" type="text"/>
                <InputWithTitle title="email" type="email"/>
                <InputWithTitle title="password" type="password"/>
                <Button text="submit"/>
            </form>
        </div>

    )
}
export default Register