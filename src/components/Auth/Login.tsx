"use client";

import Favicon from "@/../public/favicon-16.png"
import Image from "next/image";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { RotatingLines } from "react-loader-spinner";

import {Logo} from "../Logo"
import { useLogin } from "../../providers/LoginProvider"
import {ToastContainer,toast} from "react-toastify"

import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";

function Login() {
  const [inputValue, setInputValue] = useState<string|null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {login,isLoggedIn} = useLogin()
  const navigate = useNavigate();

  useEffect(() => {
   
  },[inputValue])

  const handleLogin = () => {
    if (inputValue === null || inputValue==="") {
        toast.error("please fill the password")
    } else {
      console.log("password is", inputValue);
      const isLogged = login(inputValue);
      if (isLogged) {
        console.log("isLogged", isLogged);
        navigate("/home");
        return;
      }
      if (!isLogged) {
        toast.error("invalid password");
        return;
      }
    }
    
  }
  if(isLoading){
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    );
    }
    return (
      <div className=" flex bg-[#0d0d0d]  md:border-2 md:border-white  md:rounded-2xl flex-col justify-center items-center gap-4 md:h-[768px] md:w-[768px]">
        <ToastContainer />
        <div>
          {/* <ArrowDownCircleIcon className="h-6 w-6 text-blue-500" /> */}
          <Logo />
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="text-5xl text-[#2f80ed] whitespace-nowrap">
            {" "}
            Welcome Back
          </h1>
          <p className="text-3xl  whitespace-nowrap">Crypto Wallet</p>
          <div className=" flex flex-col justify-center items-center gap-3 my-2 ">
            <input
              type="password"
              className="outline-none bg-transparent py-2 px-4 placeholder:text-xl border-b-2 border-[#373583]"
              placeholder="password"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button
              className="bg-[#2f80ed] p-2 rounded-lg  flex-1 self-stretch text-white text-center text-xl"
              onClick={handleLogin}
            >
              unlock
            </button>
            <button
              onClick={() => navigate("/enter-recovery-phrase")}
              className="text-[#2f80ed] text-xl my-2"
            >
              forgot password ?
            </button>
          </div>
        </div>
      </div>
    );
  
}

export default Login;
