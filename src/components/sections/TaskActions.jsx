import EditBtn from "../icons/EditIcon"
import DeleteBtn from "../icons/DeleteIcon"

function TaskActions({taskId}){
    return(
        <div className="min-w-[78px]">
            <button id={taskId} className="mr-3 cursor-pointer p-1 rounded-md bg-[RGB(59_130_246/.1)]"><EditBtn/></button>
            <button id={taskId} className="cursor-pointer p-1 rounded-md bg-[RGB(239_68_68/.1)]"><DeleteBtn/></button>
        </div>
    )
}
export default TaskActions