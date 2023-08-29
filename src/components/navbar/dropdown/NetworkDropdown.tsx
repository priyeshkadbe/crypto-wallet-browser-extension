// NetworkDropdown.tsx
import React, { useEffect, useState } from "react";
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
import { Ethereum } from "@/svg-icons/Ethereum";
import { Polygon } from "@/svg-icons/Polygon";
import { useLogin } from "@/providers/LoginProvider";
import networks_const from "@/utils/networks";

interface NetworkProps {
  onClose: () => void;
}

const NetworkContent = () => {
  const { network, setChainId, chainId } = useLogin();

  const [local, setLocal] = useState("");
  const [selectedChainId, setSelectedChainId] = useState<number | null>(null); // State to track the selected chainId


  useEffect(() => {
     if (network !== null) {
      setLocal(network.toString());
     }
    setSelectedChainId(chainId)
  }, [network,chainId]);

  return (
    <div className="flex flex-col   gap-2">
      <div className="overflow-y-auto">
        {networks_const.map((val, key) => (
          <button
            className={`flex justify-start items-start my-2 flex-grow gap-2 p-2 border border-gray-600 w-full ${
              val.chainId === selectedChainId ? "text-white" : "" // Apply text-white class if chainId matches the selectedChainId
            }`}
            onClick={() => {
              setChainId(val.chainId);
              setSelectedChainId(val.chainId);
            }}
          >
            <div className=" ">
              <Polygon />
            </div>
            <h2 className="text-lg font-medium">{val.network}</h2>
          </button>
        ))}
      </div>

      <button className="flex justify-center items-center text-blue-500 ">
        Add A Network
      </button>
    </div>
  );
};

const NetworkDropdown: React.FC<NetworkProps> = ({ onClose }) => {
  return (
    <DropDownLayout
      title="Select Network"
      content={<NetworkContent />}
      onClose={onClose}
      icon={<GlobeAltIcon className="h-6 w-6" />}
    />
  );
};

export default NetworkDropdown;
