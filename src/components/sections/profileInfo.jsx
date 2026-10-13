import Paragraph from "../Ui/Paragraph";
import { useContext } from "react";
import { UserDataContext } from "../../context/userdataContext";
function ProfileInfo({ className = "", setProfileInfo }) {
  const { userData } = useContext(UserDataContext);
  return (
    <div
      onClick={() => {
        setProfileInfo(false);
      }}
      className={className}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="min-w-[350px] bg-white rounded-lg p-4 overflow-auto mx-2"
      >
        <div className="text-center">
          <Paragraph className="formTitle" text="profile info" />
        </div>
        <div className="flex gap-4 justify-between mb-4 ">
          <Paragraph className="font-inter" text="full name" />
          <Paragraph
            className="text-gray-500 font-inter"
            text={userData.fullName}
          />
        </div>{" "}
        <div className="flex gap-4 justify-between">
          <Paragraph className="font-inter" text="email" />
          <Paragraph
            className="text-gray-500 font-inter"
            text={userData.email}
          />
        </div>
      </div>
    </div>
  );
}
export default ProfileInfo;
