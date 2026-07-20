import FirstLetterUpperFunc from "@/js/FirstLetterUpper.js"
import ReplaceSpaceFunc from "@/js/replaceSpace.js"
import TaskActions from "./TaskActions"
function Task({task,type,className="",date="dd/mm/yyyy",taskId,setTasks,tasks,setEdit,setId}){
    //
    const typeObject ={health:"#7990F8",work:"#46CF8B",mental_health:"#BC5EAD",others:"#908986"}
    //
    return(
        <div className="py-5 border-[(RGA(0_0_0_/.15))] border-b font-inter">
            <div className="flex justify-between gap-2 mb-3">
                <p className="text-[#121212] text-[17px]">{FirstLetterUpperFunc(task)}</p>
                <TaskActions setEdit={setEdit} tasks={tasks} setTasks={setTasks} taskId={taskId} setId={setId}/>
            </div>
            <div className="flex justify-between gap-2">
                <p className={`${className} w-fit uppercase font-semibold text-xs tracking-[0.04em]`} style={{color:typeObject[ReplaceSpaceFunc(type)]}}>{type}</p>
                <span className="text-xs">{date}</span>
            </div>
        </div>
    )
}
export default Task