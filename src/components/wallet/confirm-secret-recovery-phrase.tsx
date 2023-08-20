import React from "react";
import { EyeIcon } from "@heroicons/react/20/solid";

interface ConfirmSecretRecoveryPhaseProps {
  inputValues: string[];
  onChange: (index: number, value: string) => void;
  onConfirm?: (e: React.FormEvent<HTMLFormElement>) => void; // Change to FormEvent
}

const ConfirmSecretRecoveryPhase: React.FC<ConfirmSecretRecoveryPhaseProps> = ({
  inputValues,
  onChange,
  onConfirm,
}) => {

  
  const numberOfRows = 4; // Number of rows
  const inputsPerRow = 3; // Number of inputs per row

  // Generate an array of numbers from 1 to 12
  const inputNumbers = Array.from(
    { length: numberOfRows * inputsPerRow },
    (_, index) => index + 1
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold p-4 text-center">
        Confirm Secret Recovery Phrase
      </h1>

      <div className="grid grid-cols-3 gap-4  m-2">
        {inputNumbers.map((number, index) => (
          <div key={number} className="flex items-center space-x-2">
            <span>{number}.</span>
            <input
              type="text"
              value={inputValues[index]}
              onChange={(e) => onChange(index, e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full px-2"
            />
            <button className=" ">
              <EyeIcon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          onClick={onConfirm as () => void} // Cast to correct event type
          // Pass event argument if needed
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default ConfirmSecretRecoveryPhase;
