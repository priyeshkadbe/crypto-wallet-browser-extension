"use client";

import Favicon from "@/../public/favicon-16.png"
import Image from "next/image";
import Link from "next/link";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";

import {Logo} from "../Logo"
import { useLogin } from "../../providers/LoginProvider"
import {ToastContainer,toast} from "react-toastify"

import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";

function Login() {
  const [inputValue, setInputValue] = useState("");
  const {login,isLoggedIn} = useLogin()
  const navigate = useNavigate();

  useEffect(() => {
    if(isLoggedIn){
      navigate("/home")
    }
  },[isLoggedIn,navigate])

  const handleLogin = () => {
    if (inputValue === "") {
        toast.error("please fill the password")
    }
    login(inputValue.toString())
    if (isLoggedIn) {
      navigate('/home')
    }
  }
    return (
      <div className=" flex flex-col justify-center items-center gap-4 w-full">
        <ToastContainer/>
        <div>
          {/* <ArrowDownCircleIcon className="h-6 w-6 text-blue-500" /> */}
          <Logo />
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
          <h1 className="text-5xl text-[#373583] whitespace-nowrap">
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
              value={inputValue}
            />
            <button
              className="bg-[#373583] p-2 rounded-lg  flex-1 self-stretch text-white text-center text-xl"
              onClick={() => handleLogin()}
            >
              unlock
            </button>
            <button
              onClick={() => navigate("/enter-recovery-phrase")}
              className="text-[#373583] text-xl my-2"
            >
              forgot password ?
            </button>
          </div>
        </div>
      </div>
    );
  
}

export default Login;
