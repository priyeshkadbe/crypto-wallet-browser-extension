import React from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function ImportExisiting() {
  const numberOfRows = 4; // Number of rows
  const inputsPerRow = 3; // Number of inputs per row

  // Generate an array of numbers from 1 to 12
  const inputNumbers = Array.from(
    { length: numberOfRows * inputsPerRow },
    (_, index) => index + 1
  );

  const navigate = useNavigate();

  return (
    <div className="flex flex-col justify-center items-center p-4">
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
      <div className="grid grid-cols-3 gap-4  m-2 my-4">
        {inputNumbers.map((number, index) => (
          <div key={number} className="flex items-center space-x-2">
            <span>{number}.</span>
            <input
              type="text"
              // value={inputValues[index]}
              // onChange={(e) => onChange(index, e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full px-2"
            />
            <button className=" ">
              <EyeIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center my-2 items-center">
        <button
          type="button"
          // onClick={onConfirm as () => void} // Cast to correct event type
          // Pass event argument if needed
          onClick={() => navigate("/new-password")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
