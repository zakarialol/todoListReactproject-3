import EditBtn from "../icons/EditIcon"
import DeleteBtn from "../icons/DeleteIcon"

function TaskActions({task,onclick,setTasks,tasks,setEdit,setSelectedTask,setValue,setSelected,hide}){
        // delete task fro mthe obj funtion
        function deleteTask(task){
            const id = task.id
            setTasks(()=>{
                return tasks.filter(task => task.id !== id)
            })
            if(tasks.length <= 1){
                console.log('we are entring the tasks empty')
                console.log("hide",hide)
                const condition = hide ? true : false
                console.log("condition",condition)
                setEdit(false,condition)
            }
        }
        //
    return(
        <div className="min-w-[78px]">
            {/* // */}
            <button onClick={()=>{
                console.log("hello world")
                setEdit(true,false)
                setSelectedTask(task)
                setValue(task.task)
                setSelected(task.type)
            }}
            id={task.id} className="mr-3 cursor-pointer p-1 rounded-md bg-[RGB(59_130_246/.1)]"><EditBtn/></button>

            {/* // */}
            <button onClick={()=>{
                deleteTask(task)
            }} id={task.id} className="cursor-pointer p-1 rounded-md bg-[RGB(239_68_68/.1)]"><DeleteBtn/></button>
        </div>
    )
}
export default TaskActions