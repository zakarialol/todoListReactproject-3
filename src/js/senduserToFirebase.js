//
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../Firebase/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
//
async function sendUserToFirebase({ fullName, email, password }) {
  try {
    const userCridenial = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const uid = userCridenial.user.uid;
    await setDoc(doc(db, "users", uid), {
      fullName: fullName,
    });
    return userCridenial;
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      console.log("this email already exist");
    } else {
      console.log(err);
    }
  }
}
export default sendUserToFirebase;
