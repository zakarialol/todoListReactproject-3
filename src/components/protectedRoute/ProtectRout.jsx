//firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../Firebase/firebase";
//react
import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
//
import Home from "../pages/Home";
//
function ProtectRoute({ children, user, loading }) {
  if (loading) {
    return <h1>loading ...</h1>;
  }
  if (!user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
export default ProtectRoute;
