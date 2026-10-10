// firebase
import { auth } from "../Firebase/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
//
async function signInWithUserAndPassword({ user, password }) {
  try {
    const result = await signInWithEmailAndPassword(auth, user, password);
    return result;
  } catch (err) {
    throw err;
  }
}
export default signInWithUserAndPassword;
