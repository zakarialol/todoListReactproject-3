function InputWithTitle({title,type}){
    return (
        <div>
            <label htmlFor={title} className="block inputTitle">{title}</label>
            <input type={type} id={title} className="registerInput"/>
        </div>
    )
}
export default InputWithTitle