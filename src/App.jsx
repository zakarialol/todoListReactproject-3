import { BrowserRouter, Routes, Route } from "react-router-dom";
//pages
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Login from "./components/pages/Login";
import VerifyEmail from "./components/pages/VerifyEmail.jsx";
import ResetPassword from "./components/pages/resetPassword.jsx";
import SendResetPasswordToEmail from "./components/pages/sendResetPasswordToEmail.jsx";
import ContactUs from "./components/pages/contactUs.jsx";
//protectd Rout
import ProtectRoute from "./components/protectedRoute/ProtectRout.jsx";
//outlet
import Layout from "./components/Ui/Layout.jsx";
//bin
import BinPage from "./components/bin/BinPage.jsx";
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
              <Route path="/verifyEmail" element={<VerifyEmail />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route path="/resetPassword" element={<ResetPassword />} />
              <Route
                path="/sendResetPasswordToEmail"
                element={<SendResetPasswordToEmail />}
              />
              <Route path="/bin" element={<BinPage />} />
              {/* <Route path="/newPassword" element={<Newpassword />} /> */}
              <Route path="/contactUs" element={<ContactUs />} />
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
