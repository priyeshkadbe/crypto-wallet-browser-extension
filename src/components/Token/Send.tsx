import React from "react";
import { CurrencyDollarIcon } from "@heroicons/react/20/solid";
interface SendProps {
  onClose: () => void; // Function to close the modal
}

const Send: React.FC<SendProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-medium text-gray-900">Send To</h3>
          <button
            type="button"
            className="text-blue-500 text-lg  ml-auto inline-flex justify-center items-center"
            onClick={() => onClose()}
          >
            
           close
          </button>
        </div>
        <div className="p-6 space-y-6">
          <input
            type="text"
            id="helper-text"
            aria-describedby="helper-text-explanation"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter public address(0x) or ENS name"
          />
        </div>
        <div className="flex flex-col items-start p-6 space-x-2 border-t border-gray-200 rounded-b">
          <h1 className="text-xl font-semibold my-2">Your Accounts</h1>

          <div className="flex flex-col w-full  gap-1">
            <button className="flex justify-start items-start  flex-grow gap-2 p-2 border border-gray-600 w-full">
              <CurrencyDollarIcon className="h-8 w-8" />
              <div className="flex flex-col">
                <h2 className="text-lg font-medium">Account 1</h2>
                <h2 className="text-lg ">0xerererer</h2>
              </div>
            </button>
            <button className="flex justify-start flex-grow items-start gap-2 p-2 border border-gray-600 w-full">
              <CurrencyDollarIcon className="h-8 w-8" />
              <div className="flex flex-col">
                <h2 className="text-lg font-medium">Account 1</h2>
                <h2 className="text-lg ">0xerererer</h2>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Send;
