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

  useEffect(() => {
    if (network !== null) {
      setLocal(network.toString());
    }
  }, [network]);

  return (
    <div className="flex flex-col   gap-2">
      <div className="overflow-y-auto">
        {/* <button className="flex justify-evenly items-start my-2  flex-grow gap-2 p-2 border border-gray-600 w-full">
          <div className="">
            <Ethereum  />
          </div>
          <h2 className="text-lg font-medium">{ local}</h2>
        </button> */}
        {networks_const.map((val, key) => (
          <button
            className="flex justify-start items-start my-2  flex-grow gap-2 p-2 border border-gray-600 w-full"
            onClick={() => {
              setChainId(val.chainId);
              console.log("val", val.chainId);
            }}
          >
            <div className="">
              <Polygon />
            </div>
            <h2
              className={`text-lg font-medium ${
                val.chainId === chainId ? "white" : ""
              }`}
            >
              {val.network}
            </h2>
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
