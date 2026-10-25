import FirstLetterUpperFunc from "@/js/FirstLetterUpper.js";
import ReplaceSpaceFunc from "@/js/replaceSpace.js";
import TaskActions from "./TaskActions";
import CustomeCheckBox from "../sections/customCheckBox";
import { useState } from "react";
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
  const [checked, setChecked] = useState(false);
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
      <CustomeCheckBox
        onClick={taskComplete}
        checked={checked}
        // setChecked={setChecked}
        id={tasks.id}
      />
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
