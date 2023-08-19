"use client";
import Logo from "@/../public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import HomePage from "../Home/HomePage";

function Login() {
  const [inputValue, setInputValue] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const handleUnlockClick = () => {
    // You can perform any necessary validation here before unlocking.
    // If validation passes, set isLogged to true.
    if (inputValue === "yourPassword") {
      setIsLogged(true);
    } else {
      // Handle incorrect password or show an error message.
      // For simplicity, you can just log an error here.
      console.error("Incorrect password");
    }
  };
  if (!isLogged) {
    return (
      <div className=" flex flex-col justify-center items-center gap-4 w-full">
        <div>
          <Image src={Logo} alt="logo" />
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
               onClick={handleUnlockClick} 
            >
              unlock
            </button>
            <Link href="otherpage" className="text-[#373583] text-xl my-2">
              forgot password ?
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return <HomePage />;
}

export default Login;
