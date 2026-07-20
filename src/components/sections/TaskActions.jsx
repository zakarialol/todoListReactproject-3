import EditBtn from "../icons/EditIcon"
import DeleteBtn from "../icons/DeleteIcon"

function TaskActions({taskId,onclick,setTasks,tasks,setEdit,setId}){
        function deleteTask(e){
            console.log("inside delete function")
            const id = e.currentTarget.id
            setTasks(()=>{
                return tasks.filter(task => task.id !== id)
            })
            console.log(id,"Id")
        }
        // function editTask(e){
        //     console.log('inside set edit ')
        //     const id = e.currentTarget.id
        //     console.log(id,"Id")
        // }
    return(
        <div className="min-w-[78px]">
            <button onClick={(e)=>{
                setId(e.currentTarget.id)
                setEdit()
            }}
            id={taskId} className="mr-3 cursor-pointer p-1 rounded-md bg-[RGB(59_130_246/.1)]"><EditBtn/></button>
            <button onClick={deleteTask} id={taskId} className="cursor-pointer p-1 rounded-md bg-[RGB(239_68_68/.1)]"><DeleteBtn/></button>
        </div>
    )
}
export default TaskActions