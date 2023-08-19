import Logo from "@/../public/logo.svg";
import Image from "next/image";

function Signup() {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <div>
        <Image src={Logo} alt="logo" />
      </div>
      <div className="">
        <h1 className="text-xl text-[#373583] whitespace-nowrap">
          {" "}
          Welcome to Crypto Wallet
        </h1>
        <div className="flex flex-col justify-center items-center">
          <button
            className="flex items-center justify-center w-40 h-10 mt-4 bg-white border border-[#4C4AA1] text-[#4C4AA1] font-semibold text-sm rounded-lg"
            style={{
              fontFamily: "SF UI Text",
              fontSize: "14.5px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            Import Exisiting Wallet
          </button>
          <button
            className="flex items-center justify-center w-40 h-10 mt-2 bg-[#4C4AA1] text-white font-semibold text-sm rounded-lg"
            style={{
              fontFamily: "SF UI Text",
              fontSize: "14.5px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
            }}
          >
            Create New Wallet
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
