import EditBtn from "../icons/EditIcon";
import DeleteBtn from "../icons/DeleteIcon";
import { useContext } from "react";
import { UserDataContext } from "../../context/userdataContext";

function TaskActions({
  task,
  setTasks,
  tasks,
  setEdit,
  setSelectedTask,
  setValue,
  setSelected,
  hide,
}) {
  const { setBinTask, setDeletedTask } = useContext(UserDataContext);
  // delete task fro mthe obj funtion
  function deleteTask() {
    const id = task.id;
    setDeletedTask(task);
    setTasks(() => {
      return tasks.filter((task) => task.id !== id);
    });
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
        onClick={() => {
          setEdit(true, false);
          setSelectedTask(task);
          setValue(task.task);
          setSelected(task.type);
        }}
        id={task.id}
        className="mr-3 cursor-pointer p-1 rounded-md bg-[RGB(59_130_246/.1)]"
      >
        <EditBtn />
      </button>

      {/* // */}
      <button
        onClick={() => {
          deleteTask(task);
        }}
        id={task.id}
        className="cursor-pointer p-1 rounded-md bg-[RGB(239_68_68/.1)]"
      >
        <DeleteBtn />
      </button>
    </div>
  );
}
export default TaskActions;
