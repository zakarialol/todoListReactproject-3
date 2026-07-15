function Button({text,className,onClick,value}){
    return(
        <button disabled={!value.trim().length > 0 && "disabled"} onClick={onClick} className={className}>{text}</button>
    )
}
export default Button