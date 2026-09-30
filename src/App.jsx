import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
//pages
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import VerifyEmail from "./components/pages/VerifyEmail.jsx";
//protectd Rout
import ProtectRoute from "./components/protectedRoute/ProtectRout.jsx";
//
import Logo from "./components/icons/Logo";
import LogoAndTitle from "./components/sections/LogoAndTitle";
import Footer from "./components/sections/footer.jsx";
//outlet
import Layout from "./components/Ui/Layout.jsx";
//
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex min-h-dvh flex-col">
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="verifyEmail" element={<VerifyEmail />} />
            </Route>
            <Route
              path="/home"
              element={
                <ProtectRoute>
                  <Home />
                </ProtectRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
