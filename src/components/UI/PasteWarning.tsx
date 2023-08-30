import React from "react";
import { InformationCircleIcon } from "@heroicons/react/20/solid";

const PasteWarning = () => {
  return (
    <div
      className="flex items-center p-2  rounded-lg  bg-gray-500  m-2"
      role="alert"
    >
      <InformationCircleIcon className="h-12 w-12 text-gray-800 px-2" />
      <span className="text-xs text-white">
        You can paste your entire secret recovery phrase into any field
      </span>
    </div>
  );
};

export default PasteWarning;
