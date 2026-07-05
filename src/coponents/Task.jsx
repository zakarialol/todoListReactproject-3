import FirstLetterUpperFunc from "../js/FirstLetterUpper.js"
function Task({task,type,className=""}){
    //
    const typeObject ={health:"#7990F8",work:"#46CF8B",mental_health:"#BC5EAD",others:"#908986"}
    //
    return(
        <div className="py-5 border-[(RGA(0_0_0_/.15))] border-b font-inter">
            <p className="text-[#121212] text-[17px]">{FirstLetterUpperFunc(task)}</p>
            <p className={`${className} w-fit uppercase font-semibold text-xs tracking-[0.04em]`} style={{color:typeObject[type.toLowerCase().replaceAll(" ","_")]}}>{type}</p>
        </div>
    )
}
export default Task