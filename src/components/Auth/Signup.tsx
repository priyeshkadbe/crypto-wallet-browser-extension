

"use client";
import { useNavigate } from "react-router-dom";
import { Logo } from "../Logo";


function Signup() {
  
  const navigate = useNavigate();



  return (
    <div className="flex bg-[#0d0d0d] flex-col justify-center items-center gap-4 h-screen  md:h-[768px] md:w-[768px] md:rounded-lg">
      <Logo />
      <div className="">
        <h1 className="text-3xl md:text-5xl text-blue-400 my-2 px-4 whitespace-nowrap">
          {" "}
          Welcome to Crypto Wallet
        </h1>
        <div className="flex flex-col justify-center items-center m-4">
          <button
            className="flex items-center justify-center py-2 px-4  m-2   bg-white border border-[#4C4AA1] text-[#4C4AA1] font-semibold text-lg rounded-lg"
            onClick={() => navigate("/import-existing")}
          >
            Import Existing Wallet
          </button>
          <button
            className="flex items-center justify-center py-2 px-6  m-2 bg-[#4C4AA1] text-white font-semibold text-lg rounded-lg"
            onClick={() => navigate("/create-new")}
          >
            Create New Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
