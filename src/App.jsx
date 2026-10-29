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
import BinPage from "./components/bin/binPage.jsx";
//
import { useState, useEffect } from "react";
//
import { TasksProvider } from "./context/tasksProvider.jsx";
//
import { onAuthStateChanged } from "firebase/auth";
//
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./Firebase/firebase.js";
import cleanExpiredTasks from "./js/cleanExpiredTasks.js";
function App() {
  const [tasks, setTasks] = useState([]);
  // const user = auth.currentUser;

  //-------------------
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tasksLoading, setTasksLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);
  //gettting tasks from the firebase
  useEffect(() => {
    if (loading) return;

    if (!user) {
      setTasksLoading(false);
      setTasks([]);
      return;
    }

    async function getTasks() {
      setTasksLoading(true);
      try {
        await cleanExpiredTasks(user.uid);
        const tasksRef = collection(db, "users", user.uid, "tasks");
        const snapshot = await getDocs(tasksRef);

        const tasksData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTasks(tasksData);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setTasksLoading(false);
      }
    }

    getTasks();
  }, [user, loading]);
  //
  return (
    <>
      <BrowserRouter>
        <TasksProvider value={{ tasks, setTasks, user, loading, tasksLoading }}>
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
                <Route
                  path="/bin"
                  element={
                    <ProtectRoute user={user} loading={loading}>
                      <BinPage />
                    </ProtectRoute>
                  }
                />
                {/* <Route path="/newPassword" element={<Newpassword />} /> */}
                <Route path="/contactUs" element={<ContactUs />} />
              </Route>
              <Route
                path="/home"
                element={
                  <ProtectRoute user={user} loading={loading}>
                    <Home />
                  </ProtectRoute>
                }
              />
            </Routes>
          </div>
        </TasksProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
