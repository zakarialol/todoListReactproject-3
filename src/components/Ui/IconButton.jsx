function IconButton({text,onClick,className=""}){
    return (
        <button className={className} onClick={onClick}>
            <img className="" src={text} alt="" />
        </button>
    )
}
export default IconButton