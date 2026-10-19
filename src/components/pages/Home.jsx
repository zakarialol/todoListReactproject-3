//react
import { useState, useEffect } from "react";
//imgs
import healthImg from "@/assets/icons/healthImg.png";
import mentalHealthImg from "@/assets/icons//mentalHealthImg.png";
import otherImg from "@/assets/icons//otherImg.png";
import workImg from "@/assets/icons//workImg.png";
import plusImg from "@/assets/icons//plus.png";
import MenuIcon from "../../components/icons/MenuIcon";
//jsx
import Header from "../layouts/Datee";
import Category from "../sections/Category";
import Task from "../sections/Task";
import IconButton from "../Ui/IconButton";
import AddTask from "../sections/AddTask";
import EditTask from "../sections/EditTask.jsx";
import SvgButton from "../../components/Ui/Svgbutton.jsx";
import OpenSideModaleMenu from "@/components/sections/OpenSideModal";
import Footer from "../sections/footer.jsx";
import LogoAndTitle from "../sections/LogoAndTitle.jsx";
import Logo from "../icons/Logo.jsx";
import debtAndleons from "../../assets/icons/dollar.png";
import edication from "../../assets/icons/graduation-hat.png";
//js
import { GenirateId } from "@/js/genirateId.js";
import getUserFromDB from "../../js/getuserFromDb.js";
//firebase
import { auth } from "../../Firebase/firebase.js";
//context
import { UserDataContext } from "../../context/userdataContext.jsx";
// import categoryIncrementFunc from "@/js/incrementCategory.js";
function Home() {
  const [hide, setHide] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [OpenSideModale, setOpenSideModale] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState("");
  //
  const data = useEffect(() => {
    async function laoduser() {
      const data = await getUserFromDB();
      setUserData(data);
    }
    laoduser();
  }, []);
  //categories ------------------------
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
      type: "education",
      img: edication,
      className: "bg-[RGB(0_0_255_/0.1)]",
    },
    {
      id: "5",
      type: "debts",
      img: debtAndleons,
      className: "bg-[RGB(0_0_0_/0.1)]",
    },
    {
      id: "6",
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
    setValue("");
    setSelected("");
  }
  // edit task
  function editTask(selectedTask) {
    setTasks(
      tasks.map((task) => {
        if (task?.id === selectedTask.id) {
          task.task = value;
          task.type = selected || "others";
        }
        return task;
      }),
    );
    setEdit(false);
  }
  // filter the task
  const filterdTasks = tasks?.filter((task) => {
    if (selectedCategory === "health") return task.type === selectedCategory;
    if (selectedCategory === "work") return task.type === selectedCategory;
    if (selectedCategory === "mental health")
      return task.type === selectedCategory;
    if (selectedCategory === "education") return task.type === selectedCategory;
    if (selectedCategory === "debts") return task.type === selectedCategory;
    if (selectedCategory === "others") return task.type === selectedCategory;
    return task;
  });
  return (
    <UserDataContext.Provider value={{ userData }}>
      <div className="px-6 pt-[80px] flex min-h-dvh flex-col">
        <LogoAndTitle
          logo={<Logo width="32" height="32" />}
          title="askanote"
          className="flex gap-2 items-center fixed top-0 w-full bg-white py-6 z-30"
        />
        <div className="flex justify-between">
          <Header />
          <SvgButton
            svg={<MenuIcon width={"35px"} height={"35px"} />}
            onclick={() => {
              setOpenSideModale(!OpenSideModale);
            }}
          />
        </div>
        <OpenSideModaleMenu
          OpenSideModale={OpenSideModale}
          setOpenSideModale={setOpenSideModale}
          className="bg-white w-[272px] -right-full fixed  top-0 h-dvh z-50 transition-all duration-300 ease-linear boxShadowGray"
        />
        <div className="grid grid-cols-2 gap-2 my-8">
          {category.map((category, index) => (
            <Category
              key={index}
              category={category}
              selectedCategory={
                selectedCategory === category.type ? category.type : null
              }
              count={tasks.filter((task) => task.type === category.type).length}
              onClick={() => {
                setSelectedCategory(() =>
                  selectedCategory === category.type ? null : category.type,
                );
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
            setHide={setHide}
          />
        )}
        {/* edit task */}
        {edit && (
          <EditTask
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

        <div className="c:\Users\hphp7\Downloads\dollar.pngrelative">
          {filterdTasks.map((task) => (
            <Task
              key={task?.id}
              setEdit={(isEditDivOpen, isAddDivOpen) => {
                setEdit(isEditDivOpen);
                setHide(isAddDivOpen);
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
          imgPath={plusImg}
          className="bg-[#393433] border border-[#ACACAC] rounded-xl px-[21px] py-[14px] fixed bottom-[30px] right-[30px]"
          onClick={() => {
            setHide(true);
            setEdit(false);
            setValue("");
            setSelected("");
          }}
        />
      </div>
      <Footer
        text={"made by zakarialol"}
        className="text-center  font-inter bg-[#383838] text-white p-2 content-center capitalize mt-[40px]"
      />
    </UserDataContext.Provider>
  );
}
export default Home;
