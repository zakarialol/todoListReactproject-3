import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/pages/Home"
import Register from "./components/pages/Register"
function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
