function Button({text}){
    return (
        <button className="bg-[#393433] border border-[#ACACAC] rounded-xl px-[21px] py-[14px] fixed bottom-[30px] right-[30px]">
            <img className="" src={text} alt="" />
        </button>
    )
}
export default Button