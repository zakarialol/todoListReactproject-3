import { useState, useEffect } from "react";
//firebase
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../Firebase/firebase.js";
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
import UndoTask from "../sections/undoAskaNote.jsx";
import CircleLoadingDiv from "../sections/CircleLoadingDiv.jsx";
//js
import getUserFromDB from "../../js/getuserFromDb.js";
//context
import { UserDataContext } from "../../context/userdataContext.jsx";
import { useTasks } from "../../context/tasksProvider.jsx";

function Home() {
  const { tasks, setTasks, loading } = useTasks();
  const user = auth.currentUser;

  const [hide, setHide] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [edit, setEdit] = useState(false);
  const [selected, setSelected] = useState("");
  const [value, setValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [OpenSideModale, setOpenSideModale] = useState(false);
  const [userData, setUserData] = useState("");
  const [deletedTask, setDeletedTask] = useState();
  if (loading) return <CircleLoadingDiv />;
  useEffect(() => {
    async function laoduser() {
      const data = await getUserFromDB();
      setUserData(data);
    }
    laoduser();
  }, []);

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

  const filterdTasks = tasks
    ?.filter((task) => {
      if (task.deletedAt) return false;
      if (selectedCategory === "health") return task.type === selectedCategory;
      if (selectedCategory === "work") return task.type === selectedCategory;
      if (selectedCategory === "mental health")
        return task.type === selectedCategory;
      if (selectedCategory === "education")
        return task.type === selectedCategory;
      if (selectedCategory === "debts") return task.type === selectedCategory;
      if (selectedCategory === "others") return task.type === selectedCategory;
      return task;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <UserDataContext.Provider
      value={{
        selectedTask,
        setEdit,
        userData,
        tasks,
        deletedTask,
        setDeletedTask,
        setTasks,
      }}
    >
      <div className="flex min-h-dvh flex-col lg:flex-row">
        <aside className="fixed left-0 top-0 z-40 hidden h-dvh w-64 flex-col border-r border-gray-200 bg-white lg:flex">
          <LogoAndTitle
            logo={<Logo width="32" height="32" />}
            title="askanote"
            className="flex items-center gap-2 px-6 py-6"
          />

          <div className="min-h-0 flex-1 overflow-y-auto">
            <OpenSideModaleMenu
              OpenSideModale={true}
              setOpenSideModale={setOpenSideModale}
              className="static h-full w-full bg-white shadow-none"
            />
          </div>
        </aside>
        {/* Mobile sidebar */}
        <div className="lg:hidden">
          <OpenSideModaleMenu
            OpenSideModale={OpenSideModale}
            setOpenSideModale={setOpenSideModale}
            className={`fixed top-0 right-0 z-50 h-dvh w-[min(272px,85vw)] bg-white transition-transform duration-300 ease-in-out boxShadowGray ${
              OpenSideModale ? "translate-x-0" : "translate-x-full"
            }`}
          />
        </div>

        {/* Right content area */}
        <div className="flex min-h-dvh min-w-0 flex-1 flex-col lg:ml-64">
          {/* Header */}
          <header className="sticky top-0 z-30 bg-white/95 px-4 pb-3 backdrop-blur-sm sm:px-6 lg:px-8">
            <div className="lg:hidden">
              <LogoAndTitle
                logo={<Logo width="32" height="32" />}
                title="askanote"
                className="flex w-full items-center gap-2 py-6"
              />
            </div>

            <div className="flex items-center justify-between py-4">
              <Header />

              <div className="lg:hidden">
                <SvgButton
                  svg={<MenuIcon width={"35px"} height={"35px"} />}
                  onclick={() => {
                    setOpenSideModale(!OpenSideModale);
                  }}
                />
              </div>
            </div>
          </header>

          {/* Scrollable main content */}
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 sm:px-6 lg:px-8">
            {/* Categories */}
            <div className="my-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
              {category.map((category, index) => (
                <Category
                  key={index}
                  category={category}
                  selectedCategory={
                    selectedCategory === category.type ? category.type : null
                  }
                  count={
                    tasks.filter((task) => {
                      if (task.deletedAt) return false;
                      return task.type === category.type;
                    }).length
                  }
                  onClick={() => {
                    setSelectedCategory(() =>
                      selectedCategory === category.type ? null : category.type,
                    );
                  }}
                />
              ))}
            </div>

            {/* Add task */}
            {hide && (
              <AddTask
                onClick={() => setHide(false)}
                tasks={tasks}
                setTasks={setTasks}
                value={value}
                setValue={setValue}
                selected={selected}
                setSelected={setSelected}
                setHide={setHide}
              />
            )}

            {/* Edit task */}
            {edit && (
              <EditTask
                value={value}
                setValue={setValue}
                onClick={() => setEdit(false)}
                tasks={tasks}
                setTasks={setTasks}
                selected={selected}
                setSelected={setSelected}
                selectedTask={selectedTask}
                setEdit={setEdit}
              />
            )}

            {/* Tasks */}
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
          </main>

          {/* Floating add button */}
          <IconButton
            imgPath={plusImg}
            className="fixed bottom-5 right-4 z-30 rounded-xl border border-[#ACACAC] bg-[#393433] px-[21px] py-[14px] shadow-lg sm:bottom-[30px] sm:right-[30px]"
            onClick={() => {
              setHide(true);
              setEdit(false);
              setValue("");
              setSelected("");
            }}
          />

          <Footer
            text={"made by zakarialol"}
            className="mt-[40px] bg-[#383838] p-2 text-center font-inter capitalize text-white content-center"
          />
        </div>
      </div>

      <UndoTask deletedTask={deletedTask} setDeletedTask={setDeletedTask} />
    </UserDataContext.Provider>
  );
}

export default Home;
