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
function OpenSideModale({ className = "", OpenSideModale, setOpenSideModale }) {
  const navigate = useNavigate();
  function profile() {
    console.log("profile...");
  }
  function calender() {
    console.log("caledner...");
  }
  function contact() {
    console.log("contact...");
  }
  function bin() {
    console.log("bin...");
  }
  async function logout() {
    console.log("logout...");
    await signOut(auth);
  }

  //
  const menuBtns = [
    { icon: ProfileIcon, text: "profile", id: "profile", onclick: profile },
    { icon: CalenderIcon, text: "calender", id: "calender", onclick: calender },
    { icon: ContactIcon, text: "contact", id: "contacticon", onclick: contact },
    { icon: BinIcon, text: "bin", id: "bin", onclick: bin },
    { icon: LogOutIcon, text: "log out", id: "logout", onclick: logout },
  ];
  //
  return (
    <div className={`${className} ${OpenSideModale && "right-0"}`}>
      <div className="text-end">
        <SvgButton
          svg={<XmarkIcon />}
          className="mr-4 mt-4 hover:text-red-500"
          onclick={() => {
            setOpenSideModale(false);
          }}
        />
      </div>
      <Profile className="px-8 pb-7 border-b border-b-[#E2E4E5]" />
      {menuBtns.map((btn) => {
        const Icon = btn.icon;
        return (
          <button
            key={btn.id}
            className="flex gap-3 mb-1 px-8 py-3"
            onClick={btn.onclick}
          >
            <span className="cursor-pointer p-1">
              <Icon />
            </span>
            <div className="cursor-pointer p-1 font-inter capitalize">
              {btn.text}
            </div>
          </button>
        );
      })}
    </div>
  );
}
export default OpenSideModale;
