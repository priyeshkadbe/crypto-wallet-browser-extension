// AccountDropdown.tsx
import React from "react";
import DropDownLayout from "./DropDownLayout";
import {
  CurrencyRupeeIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  LockClosedIcon,
  EllipsisVerticalIcon,
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
interface AccountProps {
  onClose: () => void;
}

const AccountContent = () => {
  return (
    <div className="flex flex-col w-full  gap-1">
      <div className="overflow-y-auto">
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
      <button className="flex justify-center items-center text-blue-500 ">
        Add New Account
      </button>
    </div>
  );
}

const AccountDropdown: React.FC<AccountProps> = ({ onClose }) => {
  return (
    <DropDownLayout
      title="Account"
      content={<AccountContent/>}
      onClose={onClose}
      icon={<UserCircleIcon className="h-6 w-6" />}
    />
  );
};

export default AccountDropdown;
