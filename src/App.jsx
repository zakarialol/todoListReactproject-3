import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
//
import Logo from "./components/icons/Logo";
import LogoAndTitle from "./components/sections/LogoAndTitle";
import Footer from "./components/sections/footer.jsx";
//
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex min-h-dvh flex-col">
          <LogoAndTitle
            logo={<Logo width="32" height="32" />}
            title="askanote"
            className="flex gap-2 items-center mb-8 mt-2 px-6"
          />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="home" element={<Home />} />
          </Routes>
          <Footer
            text={"made by zakarialol"}
            className="text-center  font-inter bg-[#383838] text-white p-2 content-center capitalize mt-[40px]"
          />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
