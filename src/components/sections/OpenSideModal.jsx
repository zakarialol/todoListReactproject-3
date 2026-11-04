//firebase
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
//react
import { useNavigate } from "react-router-dom";

//svgs
import CalenderIcon from "@/components/icons/calenderIcon";
import ProfileIcon from "@/components/icons/ProfileIcon";
import LogOutIcon from "@/components/icons/logOutIcon";
import ContactIcon from "@/components/icons/contactIcon";
import BinIcon from "@/components/icons/binIcon";
import SvgButton from "@/components/Ui/Svgbutton";
import XmarkIcon from "@/components/icons/Xmark";
//jsx
import Profile from "./Profile";
import ProfileInfo from "./profileInfo";
import { useState } from "react";
//
function OpenSideModale({ className = "", OpenSideModale, setOpenSideModale }) {
  const navigate = useNavigate();
  const [prfileInfo, setProfileInfo] = useState(false);
  function profile() {
    setProfileInfo(true);
  }
  function calender() {
    navigate("/calender");
  }
  function contact() {
    navigate("/contactUs");
  }
  function bin() {
    navigate("/bin");
  }
  async function logout() {
    await signOut(auth);
  }

  //
  const menuBtns = [
    { icon: ProfileIcon, text: "profile", id: "profile", onclick: profile },
    { icon: CalenderIcon, text: "calender", id: "calender", onclick: calender },
    {
      icon: ContactIcon,
      text: "contact us",
      id: "contacticon",
      onclick: contact,
    },
    { icon: BinIcon, text: "bin", id: "bin", onclick: bin },
    { icon: LogOutIcon, text: "log out", id: "logout", onclick: logout },
  ];
  //
  return (
    <div className={`${className} p-0 shadow-none`}>
      {/* Close button: mobile only */}
      <div className="text-end lg:hidden">
        <SvgButton
          svg={<XmarkIcon />}
          className="mr-4 mt-4 hover:text-red-500"
          onclick={() => setOpenSideModale(false)}
        />
      </div>

      {/* Profile */}
      <div className="flex w-full justify-center text-center lg:items-center">
        <Profile className="w-full border-b border-[#E2E4E5] px-4 pb-7 lg:flex lg:flex-col lg:items-center lg:text-center" />
      </div>

      {/* Navigation */}
      <nav className="mt-5 flex flex-col">
        {menuBtns.map((btn) => {
          const Icon = btn.icon;

          return (
            <button
              key={btn.id}
              className="mb-1 flex items-center gap-3 rounded-lg px-6 py-3 text-left hover:bg-gray-100"
              onClick={btn.onclick}
            >
              <span className="p-1">
                <Icon />
              </span>

              <span className="p-1 font-inter capitalize">{btn.text}</span>
            </button>
          );
        })}
      </nav>

      {prfileInfo && (
        <ProfileInfo
          setProfileInfo={setProfileInfo}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-sm"
        />
      )}
    </div>
  );
}
export default OpenSideModale;
