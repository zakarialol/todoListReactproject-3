import EditBtn from "../icons/EditIcon";
import DeleteBtn from "../icons/DeleteIcon";
import { useContext } from "react";
import { UserDataContext } from "../../context/userdataContext";
import { auth, db } from "../../Firebase/firebase";
import { serverTimestamp, updateDoc, doc } from "firebase/firestore";
function TaskActions({
  task,
  setTasks,
  tasks,
  setEdit,
  setSelectedTask,
  setValue,
  setSelected,
  hide,
  checked,
}) {
  const user = auth.currentUser;
  const { setBinTask, setDeletedTask, deletedTask } =
    useContext(UserDataContext);
  // delete task fro mthe obj funtion
  function deleteTask() {
    const id = task.id;
    async function updateTaskInFirestore() {
      const taskRef = doc(db, "users", user.uid, "tasks", task.id);
      await updateDoc(taskRef, {
        deletedAt: serverTimestamp(),
      });
    }
    setDeletedTask(task);
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, deletedAt: serverTimestamp() } : task,
      ),
    );
    updateTaskInFirestore();
    if (tasks.length <= 1) {
      const condition = hide ? true : false;
      setEdit(false, condition);
    }
  }
  //
  return (
    <div className="min-w-[78px]">
      {/* // */}
      <button
        disabled={checked}
        onClick={() => {
          setEdit(true, false);
          setSelectedTask(task);
          setValue(task.task);
          setSelected(task.type);
        }}
        id={task.id}
        className={`${checked ? "cursor-not-allowed opacity-50" : "cursor-pointer "} mr-3  p-1 rounded-md bg-[RGB(59_130_246/.1)]`}
      >
        <EditBtn />
      </button>

      {/* // */}
      <button
        disabled={checked}
        onClick={() => {
          deleteTask();
        }}
        id={task.id}
        className={`${checked ? "cursor-not-allowed opacity-50" : "cursor-pointer "} p-1 rounded-md bg-[RGB(239_68_68/.1)]`}
      >
        <DeleteBtn />
      </button>
    </div>
  );
}
export default TaskActions;
