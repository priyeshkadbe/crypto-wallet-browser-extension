"use client"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  EyeIcon,
  ArrowLeftIcon,
  EyeSlashIcon,
} from "@heroicons/react/20/solid";
import PasteWarning from "../UI/PasteWarning";
import { Wallet } from "ethers";

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

  


  const togglePasswordVisibility = (index: number) => {
    const newShowPasswords = [...showPasswords];
    newShowPasswords[index] = !newShowPasswords[index];
    setShowPasswords(newShowPasswords);
  };

  return (
    <div className="flex flex-col justify-center items-center p-4">
      {/* ... (existing JSX) */}
      <div className="grid grid-cols-3 gap-4 m-2">
        {inputValues.map((value, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>{index + 1}.</span>
            <input
              type={showPasswords[index] ? "text" : "password"}
              value={value}
              // onChange={(e) => handleInputChange(index, e.target.value)}
              // onPaste={(e) => handlePaste(e, index)}
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
          // onClick={() => handleCheck()} 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Check
        </button>
        <button
          type="button"
          onClick={() => navigate("/new-password")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
