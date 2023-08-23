"use client"
import React, { ReactHTMLElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  checkAccountExists,
  encryptMnemonic,
  storeMnemonics,
} from "../../services/accountServices";
import {
  EyeIcon,
  ArrowLeftIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import PasteWarning from "../UI/PasteWarning";
import { ethers } from "ethers";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as bip39 from "bip39";
interface InputValues {
  [index: number]: string;
}

export default function ImportExisting() {
  const numberOfRows = 4; // Number of rows
  const inputsPerRow = 3; // Number of inputs per row
  const totalInputs = numberOfRows * inputsPerRow;

  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState<string[]>(
    Array(totalInputs).fill("")
  );
  const [showPasswords, setShowPasswords] = useState<boolean[]>(
    Array(totalInputs).fill(false)
  );

  const handlePaste = (e: React.ClipboardEvent<HTMLElement>, index: number) => {
    e.preventDefault();
    const pasteText = e.clipboardData.getData('text');
    const words = pasteText.split(" ");
    const newInputValues = [...inputValues];
    words.slice(0, totalInputs).forEach((word, i) => {
      newInputValues[i]=word
    })
    
    setInputValues(newInputValues);
  }

  const handleInputChange = (
    index: number,
   word:string
  ) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = word;
    setInputValues(newInputValues);
  };

  const isAllField = () => {
    return inputValues.every((value) => value.trim() !== "");
  }

  const togglePasswordVisibility = (index: number) => {
    const newShowPasswords = [...showPasswords];
    newShowPasswords[index] = !newShowPasswords[index];
    setShowPasswords(newShowPasswords);
  };



 

  const accountExists = async (
    ) => {
    if (!isAllField()) {
      toast.error("please fill all the fields");
      return false
    }
    let isWalletExits = await checkAccountExists(inputValues.join(" "));
    if (!isWalletExits) {
      toast.error("provided mnemonic(seed phrase) is incorrect")
      return 
    }
    toast.success("exits");
    navigate("/new-password")
  };



  return (
    <div className="flex flex-col justify-center items-center p-4">
      <ToastContainer />

      <div className="flex flex-start ">
        <button onClick={() => navigate("/")}>
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="flex flex-row  justify-center items-center my-2">
        <h1 className="text-3xl font-semibold my-2 text-center">
          Access your wallet with your Secret Recovery Phrase
        </h1>
      </div>
      <div className="flex my-2 flex-row whitespace-nowrap justify-center items-center">
        <h4 className="text-xl ">Type your Secret Recovery Phrase</h4>
      </div>
      <PasteWarning />

      <div className="grid grid-cols-3 gap-4 m-2">
        {inputValues.map((value, index) => (
          <div key={index} className="flex items-center space-x-1">
            <span>{index + 1}.</span>
            <input
              type={showPasswords[index] ? "text" : "password"}
              value={value}
              onChange={(e) => handleInputChange(index, e.target.value)}
              onPaste={(e) => handlePaste(e, index)}
              className="border border-gray-300 p-2 rounded-lg w-full px-2 mnemonic-input"
            />
            <button
              onClick={() => togglePasswordVisibility(index)}
              className=" "
            >
              {showPasswords[index] ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeSlashIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center my-2 items-center">
        <button
          type="button"
          // onClick={() => navigate("/new-password")}
          onClick={() => accountExists()}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
