//
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
//
async function sendUserToFirebase({
  fullName,
  email,
  password,
  setEmailExistAlready,
  setErrors,
}) {
  try {
    const userCridenial = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // setEmailExistAlready(false)
    const uid = userCridenial.user.uid;
    await setDoc(doc(db, "users", uid), {
      fullName: fullName,
    });
    return userCridenial;
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      console.log("this email exist already ");
      setEmailExistAlready(true);
      //show the error
      setErrors((prev) => ({
        ...prev,
        ["email"]: {
          ...prev["email"],
          showError: true,
        },
      }));
      //hide the error after .5s
      setTimeout(() => {
        setErrors((prev) => ({
          ...prev,
          ["email"]: {
            ...prev["email"],
            showError: false,
          },
        }));
      }, 1500);
      //restoring the error msg
      setTimeout(() => {
        setEmailExistAlready(false);
      }, 2000);
    } else {
      console.log(err);
    }
  }
}
export default sendUserToFirebase;
