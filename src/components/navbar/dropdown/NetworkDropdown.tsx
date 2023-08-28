// NetworkDropdown.tsx
import React, { useEffect } from "react";
import DropDownLayout from "./DropDownLayout";
import {
  CurrencyRupeeIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  LockClosedIcon,
  EllipsisVerticalIcon,
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import AddNewNetwork from "@/components/Networks/AddNewNetwork";
import { useWalletState } from "@/providers/WalletProvider"
import {Ethereum} from "@/svg-icons/Ethereum"

interface NetworkProps {
  onClose: () => void;
}


const NetworkContent = () => {

  const {network}=useWalletState()

  useEffect(() => {
    
  },[network])

  return (
    <div className="flex flex-col w-full  gap-1">
      <div className="overflow-y-auto">
        <button className="flex justify-evenly items-start my-2  flex-grow gap-2 p-2 border border-gray-600 w-full">
          {/* <div className="h-2 w-2">
            <Ethereum  />
          </div> */}
          <h2 className="text-lg font-medium">{network}</h2>
        </button>
      </div>

      <button className="flex justify-center items-center text-blue-500 ">
        Add A Network
      </button>
    </div>
  );
};



const NetworkDropdown: React.FC<NetworkProps> = ({ onClose }) => {

  const content = () => {
    
  }

  return (
    <DropDownLayout
      title="Network"
      content={<NetworkContent/>}
      onClose={onClose}
      icon={<GlobeAltIcon className="h-6 w-6" />}
    />
  );
};

export default NetworkDropdown;
