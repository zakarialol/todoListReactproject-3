import { useState } from "react"
function Input({type,placeHolder="",className,value,setValue}){
    return(
        <input type={type}  value={value}  placeholder={placeHolder} onChange={(e)=>setValue(e.target.value)} className={className}/>
    )
}
export default Input