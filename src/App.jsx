import { useState } from "react"
//imgs
import healthImg from "/healthImg.png"
import mentalHealthImg from "/mentalHealthImg.png"
import otherImg from "/otherImg.png"
import workImg from "/workImg.png"
import plusImg from "/plus.png"
//
import Header from "./coponents/Datee"
import Category from "./coponents/Category"
import Task from "./coponents/Task"
import Button from "./coponents/Button"
function App() {
    const [tasks, setTasks] = useState([
        {
            id:"1",
            type:"health",
            task: "drink harl cup of water in morning",
            taskNumber: 4,
            img:healthImg,
            className : "bg-[RGB(121_144_248_/0.1)]"
        },
        {
            id:"2",
            type:"work",
            task: "run half our evryday",
            taskNumber: 0,
            img:workImg,
            className : "bg-[RGB(70_207_139_/0.1)]"

        },
        {
            id:"3",
            type:"mental health",
            task: "watch movie",
            taskNumber: 0,
            img:mentalHealthImg,
            className : "bg-[RGB(188_94_173_/0.1)]"

        },
        {
            id:"4",
            type:"others",
            task:"call freind",
            taskNumber: 0,
            img:otherImg,
            className : "bg-[RGB(144_137_134_/0.1)]"

        },
    ])
    return(
        <div className="px-6 pt-6 h-dvh relative">
            <Header />
            <div className="grid grid-cols-2 gap-2 my-8">
                {tasks.map((task=>(
                    <Category key={task.id} type={task.type} className={task.className} taskNumber={task.taskNumber} img={task.img}/>
                )))}
            </div>
            <div>
                {tasks.map((task=>(
                    <Task  type={task.type} task={task.task} className={task.className}/>
                )))}
            </div>
            <Button text={plusImg}/>
        </div>
    )
}

export default App
