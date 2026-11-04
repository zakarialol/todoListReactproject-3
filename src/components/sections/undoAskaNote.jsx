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
    }, 2000);

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
      <div className="fixed bottom-5 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 overflow-hidden rounded-xl border border-orange-200 bg-gradient-to-r from-orange-50 to-orange-100 text-gray-800 shadow-lg">
        <div className="flex items-center gap-3 p-3">
          <div className="flex-1 min-w-0">
            <p className="font-semibold">Task moved to bin</p>
            <p className="truncate text-sm text-gray-600">
              {deletedTask.title}
            </p>
          </div>

          <button
            type="button"
            onClick={undoTask}
            className="shrink-0 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-2 font-semibold capitalize text-white shadow-sm transition hover:from-orange-600 hover:to-orange-700 active:scale-95"
          >
            undo
          </button>
        </div>

        <div className="h-1 bg-orange-200">
          <div
            key={deletedTask.id}
            className="undo-progress h-full w-full bg-gradient-to-r from-orange-400 to-orange-600"
          />
        </div>
      </div>
    </div>
  );
}
export default undoTask;
