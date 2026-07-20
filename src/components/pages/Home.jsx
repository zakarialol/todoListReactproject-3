import { useState ,useEffect } from "react";
//imgs
import healthImg from "@/assets/icons/healthImg.png";
import mentalHealthImg from "@/assets/icons//mentalHealthImg.png";
import otherImg from "@/assets/icons//otherImg.png";
import workImg from "@/assets/icons//workImg.png";
import plusImg from "@/assets/icons//plus.png";
//jsx
import Header from "../layouts/Datee";
import Category from "../sections/Category";
import Task from "../sections/Task";
import IconButton from "../Ui/IconButton";
import AddTask from "../sections/AddTask";
//js
import { GenirateId } from "@/js/genirateId.js";
// import categoryIncrementFunc from "@/js/incrementCategory.js";

function Home() {
  const [hide, setHide] = useState(false);
  const [edit, setEdit] = useState(false);
  const [idd, setId] = useState(null);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: "1",
      type: "health",
      task: "drink harl cup of water in morning",
      date: "20/20/2000",
    },
    {
      id: "2",
      type: "work",
      task: "run half our evryday",
      date: "20/20/2000",
    },
    {
      id: "3",
      type: "mental health",
      task: "watch movie",
      date: "20/20/2000",
    },
    {
      id: "4",
      type: "others",
      task: "call freind",
      date: "20/20/2000",
    },
  ]);
    useEffect(()=>{
      console.log("rendring again ...")
},[tasks])

  //
  const [category, setCategory] = useState([
    {
      id: "1",
      type: "health",
      img: healthImg,
      className: "bg-[RGB(121_144_248_/0.1)]",
    },
    {
      id: "2",
      type: "work",
      img: workImg,
      className: "bg-[RGB(70_207_139_/0.1)]",
    },
    {
      id: "3",
      type: "mental health",
      img: mentalHealthImg,
      className: "bg-[RGB(188_94_173_/0.1)]",
    },
    {
      id: "4",
      type: "others",
      img: otherImg,
      className: "bg-[RGB(144_137_134_/0.1)]",
    },
  ]);
  //add task
  function addTask(e) {
    setTasks([
      ...tasks,
      {
        id: GenirateId(tasks),
        task: value,
        date: new Date().toLocaleString(),
        type: selected || "others",
      },
    ]);
  }
  // edit task
  function editTask(e) {
    console.log("id", idd);
    setTasks(
      tasks.map((task) => {
        if (task?.id === idd) {
          task.task = value;
          task.type = selected || "others";
        }
        return task;
      }),
    );
  }
  return (
    <div className="px-6 pt-6 h-dvh">
      <Header />

      <div className="grid grid-cols-2 gap-2 my-8">
        {category.map((category, index) => (
          <Category
            key={index}
            type={category.type}
            className={category.className}
            count={tasks.filter(task => task.type === category.type).length}
            img={category.img}
          />
        ))}
      </div>
      {/* add task */}
      {hide && (
        <AddTask
          onClick={() => setHide(false)}
          action={addTask}
          tasks={tasks}
          setTasks={setTasks}
          btntext={"save"}
          value={value}
          setValue={setValue}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {/* edit task */}
      {edit && (
        <AddTask
          value={value}
          setValue={setValue}
          onClick={() => setEdit(false)}
          action={editTask}
          tasks={tasks}
          setTasks={setTasks}
          btntext={"edit"}
          selected={selected}
          setSelected={setSelected}
        />
      )}

      <div className="overflow-auto h-[300px] relative pb-[85px]">
        {tasks.map((task) => (
          <Task
            taskId={task.id}
            key={task?.id}
            setId={setId}
            setEdit={() => {
              setEdit(true);
              setHide(false)
            }}
            type={task?.type}
            task={task?.task}
            tasks={tasks}
            setTasks={setTasks}
            date={task?.date}
          />
        ))}
      </div>

      <IconButton
        text={plusImg}
        className="bg-[#393433] border border-[#ACACAC] rounded-xl px-[21px] py-[14px] fixed bottom-[30px] right-[30px]"
        onClick={() => {
            setHide(true)
            setEdit(false)
        }}
      />
    </div>
  );
}
export default Home;
