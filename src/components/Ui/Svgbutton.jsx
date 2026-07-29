function SvgButton({svg ,onclick}){
    return(
            <button onClick={onclick}>{svg}</button> 
    )
}
export default SvgButton