//firebase
import { db, auth } from "../Firebase/firebase";
import { getDoc, doc } from "firebase/firestore";
async function getUserFromDB() {
  const user = auth.currentUser;
  const userdoc = await getDoc(doc(db, "users", user.uid));
  const data = userdoc.data();
  return data;
}
export default getUserFromDB;
