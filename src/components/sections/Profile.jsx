//
import Img from "@/components/Ui/Img";
import Paragraph from "@/components/Ui/Paragraph";
import { useContext } from "react";
import { UserDataContext } from "../../context/userdataContext";
//
function Profile({ className = "" }) {
  const { userData } = useContext(UserDataContext);
  return (
    <div className={className}>
      <Img className="w-16 h-16 bg-gray-300 rounded-full mb-5" />
      <Paragraph
        className="font-inter font-bold text-[#0F0F0F] capitalize"
        text={userData.fullName}
      />
    </div>
  );
}
export default Profile;
