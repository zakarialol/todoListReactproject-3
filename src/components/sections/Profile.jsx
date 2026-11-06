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
  const [finalProfilePicture, setFinalProfilePicture] = useState(
    () => sessionStorage.getItem("profileImageUrl") || null,
  );

  useEffect(() => {
    async function downloadProfilePicture() {
      const user = auth.currentUser;
      if (!user) return;

      // Already cached
      if (sessionStorage.getItem("profileImageUrl")) return;

      try {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const imageUrl = userDoc.data().profileImageUrl;

          setFinalProfilePicture(imageUrl);
        }
      } catch (error) {
        console.log(error);
      }
    }

    downloadProfilePicture();
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
    console.log(previewimage, "previewimage");
    setProfileImage(previewimage);

    //
    setShowCroper(true);
  }

  //
  return (
    <>
      <div className={className}>
        <div className="relative h-fit w-fit lg:mx-auto">
          <div className="relative mb-5 h-16 w-16 overflow-hidden rounded-full bg-gray-300">
            <Img
              img={finalProfilePicture}
              className="h-full w-full object-cover"
            />

            <CircleLoadingAnimation
              className={`absolute inset-0 h-full w-full bg-white opacity-90 ${
                ProfileCircleLoading ? "block" : "hidden"
              }`}
            />
          </div>

          {/* Edit image button */}
          <button
            onClick={() => {
              imageHolder.current.click();
            }}
            type="button"
            className="absolute bottom-0 right-[-20px] cursor-pointer rounded-full bg-white p-[2px] shadow lg:right-[-10px] lg:bottom-[10px]"
          >
            <PencilEditicon />
          </button>
        </div>

        <input
          id="profile-image"
          ref={imageHolder}
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageChange}
        />

        <Paragraph
          className="font-inter font-bold capitalize text-[#0F0F0F] lg:text-center"
          text={userData.fullName}
        />
      </div>
      {/* Crop image */}
      {showCroper && (
        <Croper
          profileImage={profileImage}
          setFinalProfilePicture={setFinalProfilePicture}
          setShowCroper={setShowCroper}
          setProfileCircleLoading={setProfileCircleLoading}
        />
      )}
    </>
  );
}

export default Profile;
