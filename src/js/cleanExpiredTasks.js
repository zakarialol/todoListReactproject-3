import { db } from "../Firebase/firebase";
import {
  collection,
  getDocs,
  query,
  where,
  Timestamp,
  writeBatch,
} from "firebase/firestore";
async function cleanExpiredTasks(userId) {
  console.log(userId.uid, "useruid");
  try {
    const thirtyDaysAgo = Timestamp.fromDate(
      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    );

    const tasksRef = collection(db, "users", userId, "tasks");

    const q = query(tasksRef, where("deletedAt", "<=", thirtyDaysAgo));

    const snapshot = await getDocs(q);

    if (snapshot.empty) return;

    const batch = writeBatch(db);

    snapshot.docs.forEach((taskDoc) => {
      batch.delete(taskDoc.ref);
    });

    await batch.commit();
  } catch (error) {
    console.error("Error cleaning expired tasks:", error);
  }
}
export default cleanExpiredTasks;
