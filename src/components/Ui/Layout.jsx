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
        className="flex gap-2 items-center  px-6 fixed top-0 w-full bg-white py-6 z-50"
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
