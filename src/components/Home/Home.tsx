"use client";
import Image from "next/image";
import { useState } from "react";
import Navbar from "../navbar";
import Activity from "./Activity";
import Tokens from "./Tokens";
import Swap from "../Token/Swap"
import AddNew from "../Token/AddNew";
import Refresh from "../Token/Refresh";
import Send from "../Token/Send";

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

   const [activeModal, setActiveModal] = useState<string | null>(null); // Track the active modal

   const handleOptionClick = (option: string) => {
     setSelectedOption(option);
   };

   const openModal = (modalName: string) => {
     setActiveModal(modalName);
   };

   const closeModal = () => {
     setActiveModal(null);
   };

  const icons: Record<string, React.ReactNode> = {
    send: <ArrowUpRightIcon className="h-10 w-10 text-blue-500"  />,
    swap: <ArrowsRightLeftIcon className="h-10 w-10  text-blue-500" />,
    addNewToken: <PlusCircleIcon className="h-10 w-10  text-blue-500" />,
  };
  
   const labels: Record<string, string> = {
     send: "Send",
     swap: "Swap",
     addNewToken: "Add New Token",
   };
  
   const renderModal = () => {
     if (!activeModal) return null;

     switch (activeModal) {
       case "send":
         return <Send onClose={closeModal} />;
       case "swap":
         return <Swap onClose={closeModal} />;
       case "addNewToken":
         return <AddNew onClose={closeModal} />;
       default:
         return null;
     }
   };


  return (
    <div>
      <Navbar />
      <div className="flex flex-col my-4 justify-center items-center mx-4">
        <div className="flex gap-2 p-2 m-2 bg-[#807DC0] rounded-full cursor-text">
          <h1>0x34....5</h1>
          <ClipboardDocumentIcon className="h-4 w-4" />
        </div>
        <div className="m-2 my-4">
          <h1 className="text-3xl">4 ETH</h1>
        </div>
        <div className="flex w-full justify-evenly gap-1">
          {Object.keys(icons).map((key) => (
            <button
              key={key}
              className="flex flex-col justify-center items-center p-1 gap-1"
              onClick={() => openModal(key)} // Open modal when the button is clicked
            >
              {icons[key]}
              <p className="text-md">{labels[key]}</p>
            </button>
          ))}
        </div>
      </div>
      <div className="flex justify-evenly flex-grow w-full ">
        <h1
          className={`cursor-pointer w-[1/2] px-18 p-2  text-lg font-light ${
            selectedOption === "tokens"
              ? "text-blue-500 border-b-2 border-blue-500"
              : ""
          }`}
          onClick={() => handleOptionClick("tokens")}
        >
          Tokens
        </h1>
        <h1
          className={`cursor-pointer w-[1/2] p-2 px-18 text-lg  font-light ${
            selectedOption === "activity"
              ? "text-blue-500 border-b-2  border-blue-500"
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
      {renderModal()}
    </div>
  );
}

export default HomePage;
