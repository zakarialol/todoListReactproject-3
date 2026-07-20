function categoryIncrementFunc ( category , setWork , setHealth,setMentalHealth,setOthers){
    console.log('am inside the switch ')
    switch (category){
        case category === "work":
            setWork((prev)=>prev + 1)
            break;
        case category === "health":
            setHealth((prev)=>prev + 1)
            break;
        case category === "mental health":
            setMentalHealth((prev)=>prev + 1)
            break;
        case category === "others":
            setOthers((prev)=>prev + 1)
            break;

    }
}
export default categoryIncrementFunc
