//
import Croper from "./Croper";
import { useRef, useEffect, useState } from "react";
import Img from "@/components/Ui/Img";
import Paragraph from "@/components/Ui/Paragraph";
import PencilEditicon from "../icons/pencilEditicon";
import { useContext } from "react";
import { UserDataContext } from "../../context/userdataContext";
import CircleLoadingAnimation from "../icons/CircleLoaingAnimation";
//firebase
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase";
//
function Profile({ className = "" }) {
  const [ProfileCircleLoading, setProfileCircleLoading] = useState(false);
  //* selected file
  const [finalProfilePicture, setFinalProfilePicture] = useState(null);
  useEffect(() => {
    const user = auth.currentUser;
    const userRef = doc(db, "users", user.uid);
    async function dowloadProfilePicture() {
      try {
        const userDoc = await getDoc(userRef);
        if (userDoc) {
          const userInfo = userDoc.data();
          setFinalProfilePicture(userInfo.profileImageUrl);
        } else {
          console.log("user document don't exist");
        }
      } catch (erro) {
        console.log(erro);
      }
    }
    dowloadProfilePicture();
  }, []);
  //* state for iamge profile ----
  const [profileImage, setProfileImage] = useState(null);
  //* for show crop div
  const [showCroper, setShowCroper] = useState(false);

  //-----------------------------------------------
  const { userData } = useContext(UserDataContext);
  const imageHolder = useRef();
  //*handle image change ----
  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    // setthe iamge to profile
    const previewimage = URL.createObjectURL(file);
    setProfileImage(previewimage);
    //
    setShowCroper(true);
  }
  //
  return (
    <div className={className}>
      <div className="relative w-fit h-fit ">
        <div className="relative w-16 h-16 bg-gray-300 rounded-full mb-5 overflow-hidden">
          <Img img={finalProfilePicture} className="w-full h-full" />
          <CircleLoadingAnimation
            className={`absolute w-full h-full inset-0 bg-white opacity-90 ${ProfileCircleLoading ? "block" : "hidden"}`}
          />
        </div>
        {/* // */}
        <button
          onClick={() => {
            imageHolder.current.click();
          }}
          type="button"
          className="absolute right-[-20px] bottom-0 bg-white p-[2px] rounded-full shadow cursor-pointer"
        >
          <PencilEditicon />
        </button>
        {/* // */}
      </div>
      {/* // */}
      {showCroper && (
        <Croper
          profileImage={profileImage}
          setFinalProfilePicture={setFinalProfilePicture}
          setShowCroper={setShowCroper}
          setProfileCircleLoading={setProfileCircleLoading}
        />
      )}
      <input
        id="profile-image"
        ref={imageHolder}
        type="file"
        accept="image/*"
        hidden
        onChange={handleImageChange}
      />
      <Paragraph
        className="font-inter font-bold text-[#0F0F0F] capitalize"
        text={userData.fullName}
      />
    </div>
  );
}
export default Profile;
