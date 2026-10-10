import Button from "../ui/Button";
import { useState } from "react";
import Cropper from "react-easy-crop";
import getCroppedImage from "../../js/getCroppedImage.js";
import uploadToCloudinary from "../../js/uploadToCloudinary.js";
//firebase
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase.js";

function Croper({
  profileImage,
  setShowCroper,
  setFinalProfilePicture,
  setProfileCircleLoading,
}) {
  //* crop
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  //*handle crop save ----------------
  async function handleCropSave() {
    try {
      setShowCroper(false);
      setProfileCircleLoading(true);
      const file = await getCroppedImage(profileImage, croppedAreaPixels);
      const profileImg = await uploadToCloudinary(file);
      setFinalProfilePicture(profileImg);
      const user = auth.currentUser;
      if (!user) {
        throw new Error("no user is logging in");
      }
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        profileImageUrl: profileImg,
      });
    } catch (err) {
      console.log("error", err);
    } finally {
      setProfileCircleLoading(false);
    }
  }
  //handle crop cancel ------------------
  function cancelCrop() {
    setShowCroper(false);
  }
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center flex-col">
      <div className="relative w-96 h-96">
        <Cropper
          image={profileImage}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={(_, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels);
          }}
        />
      </div>
      <div className="flex gap-4 justify-between">
        {" "}
        <Button
          onClick={handleCropSave}
          type="submit"
          className="inputSubBtn text-white bg-gradient-to-r from-orange-400 to-orange-700 mb-2 mt-3 w-auto"
          text="save"
        />
        <Button
          onClick={cancelCrop}
          type="submit"
          className="inputSubBtn bg-white text-black  mb-2 mt-3 w-auto "
          text="cancel"
        />
      </div>
    </div>
  );
}
export default Croper;
