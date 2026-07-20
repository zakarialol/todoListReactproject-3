import IconButton from "../Ui/IconButton"
import Input from "../Ui/Input"
import Button from "../Ui/Button"
//states
import { useState,useEffect} from "react"
//imgs
import Xmark from "@/assets/icons/xmark.png"
import Clock from "@/components/icons/Clock"

function AddTask({setTasks,tasks,onClick,btntext,action,value,setValue,selected,setSelected}){
    const typesArray = ["health","work","mental health"]
    useEffect(()=>{
        console.log('chaged **')
        console.log(tasks)
    },[tasks])

    //function to add objet 
    return(
        <div className="mb-8 bg-white ">
            <div>
                <div className="flex justify-end mb-3" onClick={onClick} ><IconButton text={Xmark}/></div>
                <Input value={value} setValue={setValue} placeHolder="write a new task..." className={"w-full px-4 py-1 text-xl placeholder:opacity-30 placeholder:text-3xl outline-none placeholder:capitalize mb-5"}/>
            </div>
            <div >
                <div className="flex gap-[10px] mb-5">
                    {typesArray.map((item,index)=><span key={item} className={` uppercase bg-[RGB(224_224_224_/.4)] px-[6px] py-[4px] rounded text-xs text-[RGB(102_102_102_/.5)] border border-transparent cursor-pointer ${selected === item ? "selected" : ""}`} key={item[item]} onClick={()=>{
                        setSelected((prev)=> prev === item ? "" : item)
                    }}>{item}</span>)}
                </div>
                <div className="gap-2">
                        <Button value={value}  onClick={()=>{
                            action()
                        }} className={`btn text-[#898989] capitalize w-full ${value.trim().length > 0 ? "bg-[#393433] text-[#FFFFFF]":""}`} text={btntext}/>
                </div>
            </div>
            

        </div>
    )
}
export default AddTask