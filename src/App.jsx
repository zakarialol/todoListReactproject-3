import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./components/pages/Home"
import Register from "./components/pages/Register"
import Login from "./components/pages/Login"
function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Register/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="login" element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
