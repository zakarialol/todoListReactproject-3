import FirstLetterUpperFunc from "@/js/FirstLetterUpper.js";
import ReplaceSpaceFunc from "@/js/replaceSpace.js";
import TaskActions from "./TaskActions";
import CustomeCheckBox from "../sections/customCheckBox";
import { useState } from "react";
import { UserDataContext } from "../../context/userdataContext";
import { useContext } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase";
function Task({
  taskText,
  type,
  className = "",
  date = "dd/mm/yyyy",
  setTasks,
  tasks,
  setEdit,
  task,
  setSelectedTask,
  setValue,
  setSelected,

  hide,
}) {
  const user = auth.currentUser;
  const { selectedTask } = useContext(UserDataContext);
  const [checked, setChecked] = useState(task.completed || false);
  //
  const typeObject = {
    health: "#7990F8",
    work: "#46CF8B",
    mental_health: "#BC5EAD",
    education: "#034078",
    debts: "#000501",
    others: "#908986",
  };
  //if the task completed
  function taskComplete() {
    setChecked((prev) => !prev);
    //update completed in fire base ---------
    async function updateCompletedInfirebase() {
      const taskRef = doc(db, "users", user.uid, "tasks", task.id);
      await updateDoc(taskRef, {
        completed: !task.completed,
      });
    }
    updateCompletedInfirebase();
    //
    if (task?.id === selectedTask?.id) setEdit(false);
    setTasks((prev) =>
      prev.map((registeredTask) =>
        registeredTask.id === task.id
          ? {
              ...registeredTask,
              completed: !registeredTask.completed,
            }
          : registeredTask,
      ),
    );
  }
  //
  return (
    <div
      className={`flex items-start gap-3 py-4 border-[(RGA(0_0_0_/.15))] border-b ${checked && "line-through"}`}
    >
      <CustomeCheckBox onClick={taskComplete} checked={checked} id={tasks.id} />
      <div className="font-inter flex-1">
        <div className="flex justify-between gap-3 mb-3">
          <p className="text-[#121212] text-[17px]">
            {FirstLetterUpperFunc(taskText)}
          </p>
          <TaskActions
            setEdit={setEdit}
            setValue={setValue}
            setSelectedTask={setSelectedTask}
            setSelected={setSelected}
            tasks={tasks}
            setTasks={setTasks}
            hide={hide}
            task={task}
            checked={checked}
          />
        </div>
        <div className="flex justify-between gap-2">
          <p
            className={`${className} w-fit uppercase font-semibold text-xs tracking-[0.04em]`}
            style={{ color: typeObject[ReplaceSpaceFunc(type)] }}
          >
            {type}
          </p>
          <span className="text-xs">{date}</span>
        </div>
      </div>
    </div>
  );
}
export default Task;
