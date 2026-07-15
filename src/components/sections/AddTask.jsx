import IconButton from "../Ui/IconButton"
import Input from "../Ui/Input"
import Button from "../Ui/Button"
//states
import { useState,useEffect} from "react"
//imgs
import Xmark from "@/assets/icons/xmark.png"
import Clock from "@/components/icons/Clock"
//js 
import {GenirateId} from "@/js/genirateId.js"
function AddTask({className,setTasks,tasks,onClick}){
    const typesArray = ["health","work","mental health"]
    const [selected,setSelected] = useState("")
    const [value,setValue] = useState("")
    useEffect(()=>{
        console.log('chaged **')
        console.log(tasks)
    },[tasks])

    //function to add objet 
    function addTask(){
        console.log(new Date().toLocaleString(),"toLocaleString")
        setTasks([...tasks,{id:GenirateId(tasks),task:value,date:new Date().toLocaleString(),type:selected || "others"}])
    }
    return(
        <div className={className}>
            <div>
                <div className="flex justify-end mb-3" onClick={onClick} ><IconButton text={Xmark}/></div>
                <Input value={value} setValue={setValue} placeHolder="write a new task..." className={"w-full px-4 py-1 text-xl placeholder:opacity-30 placeholder:text-3xl outline-none placeholder:capitalize mb-5"}/>

            </div>
            <div >
                <div className="flex gap-[10px] mb-5">
                    {typesArray.map((item,index)=><span className={` uppercase bg-[RGB(224_224_224_/.4)] px-[6px] py-[4px] rounded text-xs text-[RGB(102_102_102_/.5)] border border-transparent cursor-pointer ${selected === item ? "selected" : ""}`} key={item[item]} onClick={()=>{
                        setSelected((prev)=> prev === item ? "" : item)
                    }}>{item}</span>)}
                </div>
                <div className="gap-2 ">
                        <Button value={value}  onClick={()=>{
                            addTask()
                        }} className={`btn text-[#898989] capitalize w-full ${value.trim().length > 0 ? "bg-[#393433] text-[#FFFFFF]":""}`} text={"save"}/>
                </div>
            </div>
            

        </div>
    )
}
export default AddTask