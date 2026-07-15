import { useState } from "react"
//imgs
import healthImg from "@/assets/icons/healthImg.png"
import mentalHealthImg from "@/assets/icons//mentalHealthImg.png"
import otherImg from "@/assets/icons//otherImg.png"
import workImg from "@/assets/icons//workImg.png"
import plusImg from "@/assets/icons//plus.png"
//jsx
import Header from "../layouts/Datee"
import Category from "../sections/Category"
import Task from "../sections/Task"
import IconButton from "../Ui/IconButton"
import AddTask from "../sections/AddTask"
//icons
function Home(){
        const [hide,setHide] = useState(false)
        const [category, setCategory] = useState([
        {
            type:"health",
            taskNumber: 4,
            img:healthImg,
            className : "bg-[RGB(121_144_248_/0.1)]"
        },
        {
            type:"work",
            taskNumber: 0,
            img:workImg,
            className : "bg-[RGB(70_207_139_/0.1)]"

        },
        {
            type:"mental health",
            taskNumber: 0,
            img:mentalHealthImg,
            className : "bg-[RGB(188_94_173_/0.1)]"

        },
        {
            type:"others",
            taskNumber: 0,
            img:otherImg,
            className : "bg-[RGB(144_137_134_/0.1)]"

        },
    ])
        const [tasks, setTasks] = useState([
        {
            id:"1",
            type:"health",
            task: "drink harl cup of water in morning",
            date:"20/20/2000",
        },
        {
            id:"2",
            type:"work",
            task: "run half our evryday",
            date:"20/20/2000",

        },
        {
            id:"3",
            type:"mental health",
            task: "watch movie",
            date:"20/20/2000",

        },
        {
            id:"4",
            type:"others",
            task:"call freind",
            date:"20/20/2000",

        },
    ])
    return(
        <div className="px-6 pt-6 h-dvh">
            <Header />
            <div className="grid grid-cols-2 gap-2 my-8">
                {category.map((task=>(
                    <Category key={task.id} type={task.type} className={task.className} taskNumber={task.taskNumber} img={task.img}/>
                )))}
            </div>
            {hide && <AddTask onClick={()=>setHide(false)} className="mb-8 bg-white "tasks={tasks} setTasks={setTasks}/>}
            <div className="overflow-auto h-[300px] relative pb-[85px]">
                {tasks.map((task=>(
                    <Task taskId={task.id} key={task?.id}  type={task?.type} task={task?.task} date={task?.date} />
                )))}
            </div>
            <IconButton text={plusImg} className="bg-[#393433] border border-[#ACACAC] rounded-xl px-[21px] py-[14px] fixed bottom-[30px] right-[30px]" onClick={()=>setHide(true)}/>
        </div>
    )
}
export default Home