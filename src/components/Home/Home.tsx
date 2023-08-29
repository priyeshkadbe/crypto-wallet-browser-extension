"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "../navbar";
import Activity from "./Activity";
import Tokens from "./Tokens";
import Swap from "../Token/Swap";
import AddNew from "../Token/AddNew";
import Refresh from "../Token/Refresh";
import Send from "../Token/Send";

import {
  ArrowUpRightIcon,
  ArrowPathRoundedSquareIcon,
  ClipboardDocumentIcon,
  PlusCircleIcon,
  ArrowsRightLeftIcon,
  ArrowPathIcon,
} from "@heroicons/react/20/solid";
import { useLogin } from "@/providers/LoginProvider";
import CopyToClipboard from "react-copy-to-clipboard";
import { ToastContainer, toast } from "react-toastify";


function HomePage() {
  const [selectedOption, setSelectedOption] = useState<string>("tokens"); // Initialize with "tokens"

  const [activeModal, setActiveModal] = useState<string | null>(null); // Track the active modal
  const [localAddress, setLocalAddress] = useState<string | null>(null);

  const { balance, network, account,wallet } = useLogin();

  useEffect(() => {
    
  }, [account, balance,wallet]);

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
    send: <ArrowUpRightIcon className="h-10 w-10 text-blue-500" />,

    addNewToken: <PlusCircleIcon className="h-10 w-10  text-blue-500" />,
  };

  const labels: Record<string, string> = {
    send: "Send",
    addNewToken: "Add New Token",
  };

  const renderModal = () => {
    if (!activeModal) return null;

    switch (activeModal) {
      case "send":
        return <Send onClose={closeModal} />;
      case "addNewToken":
        return <AddNew onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <div className="  bg-[#0d0d0d]  md:shadow-2xl  h-screen  md:h-[768px] md:w-[768px] md:rounded-xl">
      <ToastContainer />
      <div className=" md:p-2 border-b border-gray-800 shadow-lg md:shadow-lg ">
        <Navbar />
      </div>
      <div className="md:h-96 md:p-4">
        <div className="flex flex-col my-4 justify-center items-center   ">
          <div className="flex gap-2 py-2 px-4 m-2 bg-gray-700  rounded-full cursor-text">
            <h1 className="text-[#b3b3b3] text-xl">
              {wallet?.address.slice(0, 7)}....{wallet?.address.slice(-4)}
            </h1>
            {/* <CopyToClipboard
              text={localAddress}
              onCopy={() => {
                toast.success("Seed phrase copied to clipboard");
              }}
            >
              <button>
                <ClipboardDocumentIcon className="h-4 w-4" />
              </button>
            </CopyToClipboard> */}
            {localAddress && (
              <CopyToClipboard
                text={localAddress}
                onCopy={() => {
                  toast.success("Seed phrase copied to clipboard");
                }}
              >
                <button>
                  <ClipboardDocumentIcon className="h-4 w-4" />
                </button>
              </CopyToClipboard>
            )}
            {!localAddress && <p>Please import your wallet</p>}
          </div>
          <div className="m-2 my-4">
            <h1 className="text-3xl text-white">{balance}</h1>
          </div>
          <div className="flex   gap-12">
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
        <div className="flex justify-evenly  ">
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
        {selectedOption === "tokens" ? <Tokens /> : <Activity />}
        {renderModal()}
      </div>
    </div>
  );
}

export default HomePage;
