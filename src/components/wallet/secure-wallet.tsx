import React, { ChangeEvent } from "react";
import { EyeIcon } from "@heroicons/react/20/solid";

interface SecureWalletProps {
  secretPhrase: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onPrev: () => void;
  onNext: () => void;
}

const SecureWallet: React.FC<SecureWalletProps> = ({
  secretPhrase,
  onChange,
  onPrev,
  onNext,
}) => {
  return (
    <div className="flex flex-col justify-center items-center overflow-y-hidden">
      <h1 className="text-3xl font-bold flex items-center justify-center text-center">
         Secret Recovery Phrase
      </h1>
      <p className="text-lg font-light px-4 py-2 flex items-center justify-center text-center">
        Write down this 12-word Secret Recovery Phrase and save it in a place
        that you trust and only you can access.
      </p>
      <textarea
        name="secretPhrase"
        id="secretPhrase"
        cols={40}
        rows={5}
        value={secretPhrase}
        onChange={onChange}
        className="m-2 outline-1 border-gray-700"
      ></textarea>
      <div className="flex flex-row justify-end gap-16 m-2">
        <button className="flex flex-row gap-2 justify-center items-center">
          <EyeIcon className="h-4 w-4" />
          <h1 className="text-blue-500 text-xs">reveal the seed phase</h1>
        </button>
        <button className="flex flex-row gap-2 justify-center items-center">
          <EyeIcon className="h-4 w-4" />
          <h1 className="text-blue-500 text-xs">copy to clipboard</h1>
        </button>
      </div>
      <div className="mt-4">
        <button
          type="button"
          onClick={onPrev}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Previous
        </button>
        <button
          type="button"
          onClick={onNext}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default SecureWallet;
