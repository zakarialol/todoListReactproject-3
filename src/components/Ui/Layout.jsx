import Footer from "../sections/footer";
import LogoAndTitle from "../sections/LogoAndTitle";
import Logo from "../icons/Logo";
import { Outlet } from "react-router-dom";
function Layout() {
  return (
    <>
      <LogoAndTitle
        logo={<Logo width="32" height="32" />}
        title="askanote"
        className="flex gap-2 items-center mb-8 mt-2 px-6"
      />
      <Outlet />
      <Footer
        text={"made by zakarialol"}
        className="text-center  font-inter bg-[#383838] text-white p-2 content-center capitalize mt-[40px]"
      />
    </>
  );
}
export default Layout;
