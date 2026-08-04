function LogoAndTitle({logo,title,className}){
    return(
        <div className={className}>
            <div >{logo}</div>
            <p className="font-inter font-bold capitalize ">{title}</p>
        </div>
    )
}
export default LogoAndTitle