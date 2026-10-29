import { useEffect, useContext } from "react";
import { UserDataContext } from "../../context/userdataContext";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase";
function undoTask({ deletedTask, setDeletedTask }) {
  const user = auth.currentUser;
  const { tasks, setTasks } = useContext(UserDataContext);
  useEffect(() => {
    // const user = auth.currentUser;
    if (!deletedTask) return;

    const timer = setTimeout(() => {
      setDeletedTask("");
    }, 5000);

    return () => clearTimeout(timer);
  }, [deletedTask]);

  if (!deletedTask) return null;
  function undoTask() {
    async function updateTaskInFirestore() {
      const taskRef = doc(db, "users", user.uid, "tasks", deletedTask.id);
      await updateDoc(taskRef, {
        deletedAt: null,
      });
    }
    updateTaskInFirestore();
    // setTasks((prev) => [...prev, { ...deletedTask, deletedAt: null }]);
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        return task.id === deletedTask.id ? { ...task, deletedAt: null } : task;
      }),
    );
    setDeletedTask("");
  }

  return (
    <div>
      <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 overflow-hidden rounded-xl border border-zinc-700 bg-zinc-900 text-white shadow-xl">
        <div className="flex items-center gap-3 p-3">
          <div className="flex-1 min-w-0">
            <p className="font-medium">task moved to bin</p>
            <p className="truncate text-sm text-zinc-400">
              {deletedTask.title}
            </p>
          </div>

          <button
            type="button"
            onClick={undoTask}
            className="shrink-0 font-semibold capitalize text-blue-400 hover:text-blue-300"
          >
            undo
          </button>
        </div>

        <div className="h-1 bg-zinc-700">
          <div
            key={deletedTask.id}
            className="undo-progress h-full w-full bg-blue-400"
          />
        </div>
      </div>
    </div>
  );
}
export default undoTask;
