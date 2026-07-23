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
  const [selectedTask, setSelectedTask] = useState(null)
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");
  const [selectedCategory,setSelectedCategory]=useState(null)
  const [tasks, setTasks] = useState([
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
    setValue("")
    setSelected("")
  }
  // edit task
  function editTask(selectedTask) {
    console.log("task", selectedTask);
    setTasks(
      tasks.map((task) => {
        if (task?.id === selectedTask.id) {
          task.task = value;
          task.type = selected || "others";
        }
        return task;
      }),
    );
    setEdit(false)
  }
  // filter the task
  const filterdTasks = tasks?.filter((task)=>{
    if(selectedCategory === "health") return task.type === selectedCategory
    if(selectedCategory === "work") return task.type === selectedCategory
    if(selectedCategory === "mental health") return task.type === selectedCategory
    if(selectedCategory === "others") return task.type === selectedCategory
    return task
  })

  return (
    <div className="px-6 pt-6 h-dvh">
      <Header />

      <div className="grid grid-cols-2 gap-2 my-8">
        {category.map((category, index) => (
          <Category
            key={index}
            category={category}
            selectedCategory={selectedCategory === category.type ? category.type : null}
            count={tasks.filter(task => task.type === category.type).length}
            onClick={()=>{
              setSelectedCategory(()=>selectedCategory === category.type? null : category.type);
            }}
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
          btntext={"add"}
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
          selectedTask={selectedTask}
        />
      )}

      <div className="overflow-auto h-[300px] relative pb-[85px]">
        {filterdTasks.map((task) => (
          <Task
            key={task?.id}
            setEdit={(isEditDivOpen,isAddDivOpen) => {
              setEdit(isEditDivOpen);
              setHide(isAddDivOpen)
            }}
            type={task?.type}
            taskText={task?.task}
            task={task}
            tasks={tasks}
            setTasks={setTasks}
            date={task?.date}
            setValue={setValue}
            hide={hide}
            setSelected={setSelected}
            setSelectedTask={setSelectedTask}
          />
        ))}
      </div>

      <IconButton
        text={plusImg}
        className="bg-[#393433] border border-[#ACACAC] rounded-xl px-[21px] py-[14px] fixed bottom-[30px] right-[30px]"
        onClick={() => {
            setHide(true)
            setEdit(false)
            setValue('')
            setSelected("")
        }}
      />
    </div>
  );
}
export default Home;
