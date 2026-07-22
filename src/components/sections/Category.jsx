import { useState } from "react"
function Task({count,onClick,category}){

    //function to filter tasks

    return (
        <div className={`p-4 ${category.className} font-inter rounded-xl border border-transparent border-2`} onClick={onClick}> 
            <img className="mb-4" src={category.img} alt={`${category.type} img`} />
            <div>
                <span className="mr-1 text-[#121212] font-bold">{count}</span>
                <span className="text-[RGB(18,18,18,.5)] inline-block capitalize">{category.type}</span>
            </div>
        </div>
    )
}
export default Task