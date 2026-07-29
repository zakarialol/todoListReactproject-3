function SvgButton({imgPath,onClick,className=""}){
    return (
        <button className={className} onClick={onClick}>
            <img src={imgPath} alt="" />
        </button>
    )
}
export default SvgButton