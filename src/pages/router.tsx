import { HashRouter, Navigate, Routes, Route, Link } from "react-router-dom";
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
import Home from ".";

export default function Router() {
  const {  isLoggedIn, isSignup } = useLogin();

  // useEffect(() => {
    
  // },[isLoggedIn,isSignup])

  return (
    <div>
      <HashRouter>
        <div>
          <Routes>
            {isSignup ? (
              // If password is present, show the login page
              <>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
              </>
            ) : (
              // If password is not present, show the signup page
              <>
                <Route path="/" element={<Signup />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
                <Route path="/import-existing" element={<ImportExisiting />} />
                <Route path="/create-new" element={<CreateNew />} />
              </>
            )}

            {isLoggedIn && isSignup && (
              // If logged in, show the home page
              <>
                <Route path="/" element={<HomePage />} />
                <Route index path="/home" element={<HomePage />} />
              </>
            )}

            {!isLoggedIn && (
              // If not logged in, redirect to login page
              <Route
                index
                path="/home"
                element={<Navigate to="/login" replace />}
              />
            )}

            {/* Add more routes as needed */}
          </Routes>
        </div>
      </HashRouter>
    </div>
  );
}
