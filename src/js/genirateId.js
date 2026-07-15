export function GenirateId(tasks){
    let id = null;
    do{
        id = "task-" + Math.floor(Math.random()*90000) + 10000
        return id
    }while(
        tasks.some((task)=>task.id === id)
    )
  
    // return Math.floor(Math.random())
}
