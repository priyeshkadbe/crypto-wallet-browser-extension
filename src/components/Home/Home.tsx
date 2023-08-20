"use client";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../navbar";
import Activity from "./Activity";
import Tokens from "./Tokens";

import {
  ArrowUpRightIcon,
  ArrowPathRoundedSquareIcon,
  ClipboardDocumentIcon,
  PlusCircleIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon
} from "@heroicons/react/20/solid";

function HomePage() {
  const [selectedOption, setSelectedOption] = useState<string>("tokens"); // Initialize with "tokens"

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const icons: Record<string, React.ReactNode> = {
    send: <ArrowUpRightIcon className="h-8 w-8" />,
    swap: <ArrowsRightLeftIcon className="h-8 w-8" />,
    addNewToken: <PlusCircleIcon className="h-8 w-8" />,
    refresh: <ArrowPathIcon className="h-8 w-8" />,
  };
  
   const labels: Record<string, string> = {
     send: "Send",
     swap: "Swap",
     addNewToken: "Add New Token",
     Refresh:"Refresh"
   };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-center items-center mx-4">
        <div className="flex gap-2 p-2 m-2 bg-[#807DC0] rounded-full cursor-text">
          <h1>0x34....5</h1>
          <ClipboardDocumentIcon className="h-4 w-4" />
        </div>
        <div className="m-2">
          <h1 className="text-3xl">4 ETH</h1>
        </div>
        <div className="flex w-full justify-between gap-2 m-2">
          {Object.keys(icons).map((key) => (
            <div
              key={key}
              className="flex flex-col justify-center items-center p-2"
            >
              {icons[key]}
              <p>{labels[key]}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between flex-grow w-full ">
        
          <h1
            className={`cursor-pointer w-[1/2] px-18  text-lg font-light ${
              selectedOption === "tokens"
                ? "text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => handleOptionClick("tokens")}
          >
            Tokens
          </h1>
          <h1
            className={`cursor-pointer w-[1/2] px-18 text-lg  font-light ${
              selectedOption === "activity"
                ? "text-blue-500 border-b-2 border-blue-500"
                : ""
            }`}
            onClick={() => handleOptionClick("activity")}
          >
            Activity
          </h1>
        
      </div>
      {selectedOption === "tokens" ? (
        <Tokens /> // Render the TokensComponent when "Tokens" is selected
      ) : (
        <Activity /> // Render the ActivityComponent when "Activity" is selected
      )}
    </div>
  );
}

export default HomePage;
