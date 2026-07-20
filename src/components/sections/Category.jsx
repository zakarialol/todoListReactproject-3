
function Task({img,type,count, className}){
    return (
        <div className={`p-4 ${className} font-inter rounded-xl`} > 
            <img className="mb-4" src={img} alt={`${type} img`} />
            <div>
                <span className="mr-1 text-[#121212] font-bold">{count}</span>
                <span className="text-[RGB(18,18,18,.5)] inline-block capitalize">{type}</span>
            </div>
        </div>
    )
}
export default Task