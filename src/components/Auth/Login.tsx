"use client";

import Favicon from "@/../public/favicon-16.png";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { RotatingLines } from "react-loader-spinner";

import { Logo } from "@/svg-icons/Logo";
import { useLogin } from "../../providers/LoginProvider";
import { ToastContainer, toast } from "react-toastify";

import { ArrowDownCircleIcon } from "@heroicons/react/20/solid";

function Login() {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isLoggedIn } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {}, [inputValue]);

  const handleLogin = async () => {
    if (inputValue === null || inputValue === "") {
      toast.error("please fill the password");
    } else {
      const isLogged = await login(inputValue);
      if (isLogged) {
        navigate("/home");
        return;
      }
      if (!isLogged) {
        toast.error("invalid password");
        return;
      }
    }
  };
  // if (isLoading) {
  //   return (
  // <RotatingLines
  //   strokeColor="grey"
  //   strokeWidth="5"
  //   animationDuration="0.75"
  //   width="96"
  //   visible={true}
  // />
  //   );
  // }
  return (
    <div className=" flex bg-[#0d0d0d]   md:rounded-2xl flex-col justify-center items-center gap-4 md:h-[768px] md:w-[768px]">
      <ToastContainer />

      {isLoading ? (
        <div>
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <div>
          <div>
            <Logo />
          </div>
          <div className="flex flex-col justify-center items-center gap-1">
            <h1 className="text-5xl text-[#2f80ed] whitespace-nowrap">
              {" "}
              Welcome Back
            </h1>
            <p className="text-3xl  whitespace-nowrap">Crypto Wallet</p>
            <div className=" flex flex-col justify-center items-center gap-3 my-2 ">
              <div className="relative h-11 w-full min-w-[200px] my-4">
                <input
                  placeholder=""
                  type="password"
                  onChange={(e) => setInputValue(e.target.value)}
                  className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal px-4 py-2 text-gray-50 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-blue-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                />
                <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-3xl font-normal leading-tight text-blue-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-blue-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-lg peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-gray-500 peer-focus:text-xl peer-focus:leading-tight peer-focus:text-white peer-focus:after:scale-x-100 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-500">
                  Password
                </label>
              </div>
              <button
                className="bg-[#2f80ed] p-2 rounded-lg  flex-1 self-stretch text-white text-center text-xl"
                onClick={handleLogin}
              >
                unlock
              </button>
              <button
                onClick={() => navigate("/forget-password")}
                className="text-[#2f80ed] text-xl my-2"
              >
                forgot password ?
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
