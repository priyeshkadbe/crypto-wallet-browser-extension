import { HashRouter, Navigate, Routes, Route, Link, useNavigate } from "react-router-dom";
import Login from "@/components/Auth/Login";

import ImportExisiting from "@/components/wallet/import-exisiting/index";
import CreateNew from "@/components/wallet/create-new";
import HomePage from "@/components/Home/Home";
import ForgotPassword from "@/components/Auth/ForgotPassword";
import NewPassword from "@/components/Auth/NewPassword";
import EnterRecoveryPhrase from "@/components/Auth/EnterRecoveryPhrase";
import Signup from "@/components/Auth/Signup";
import AddNewNetwork from "@/components/Networks/AddNewNetwork";

import { useLogin } from "../providers/LoginProvider"; // Import useLogin from your LoginContextProvider
import { useEffect } from "react";

export default function Router() {
  const { isLoggedIn, isSignup } = useLogin();
  

  useEffect(() => {
    // if (isLoggedIn && isSignup) {
    //   navigate("/home")
    //   return
    // }
    // if (isLoggedIn) {
    //   navigate("/login")
    //   return
    // }
  },[isLoggedIn,isSignup])



  return (
    <HashRouter>
      {(isLoggedIn ) ? (
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      ) : (isSignup ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
          <Route path="/forget-password" element={<ImportExisiting />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/signup" element={<Signup />}  />
          <Route path="/import-existing" element={<ImportExisiting />} />
          <Route path="/create-new" element={<CreateNew />} />
          <Route path="*" element={<Navigate to="/signup" />} />
        </Routes>
      ))}
    </HashRouter>
  );
}
