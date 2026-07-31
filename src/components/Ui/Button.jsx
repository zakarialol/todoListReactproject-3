function Button({text="",className="",onClick,value=""}){
    return(
        <button value onClick={onClick} className={className}>{text}</button>
    )
}
export default Button