function SvgButton({svg ,onclick,className=""}){
    return(
            <button className={className} onClick={onclick}>
                {svg}</button> 
    )
}
export default SvgButton