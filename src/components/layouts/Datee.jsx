function Datee(){
    const monthsArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
    const date = new Date()
    const day = date.getDate()
    const months = monthsArray[date.getMonth()]
    
    return(
        <div className="font-inter text-[#000000] capitalize text-4xl">
            <p className="inline mr-2 font-bold">today</p>
            <span className="mr-2 opacity-30">{day}</span>
            <span className=" opacity-30">{months}</span>
        </div>
    )
}
export default Datee