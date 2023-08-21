// AccountDropdown.tsx
import React from "react";
import Dropdown from "./index";
import {
  CurrencyRupeeIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  LockClosedIcon,
  EllipsisVerticalIcon,
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
} from "@heroicons/react/20/solid";
interface AccountProps {
  onClose: () => void;
}

const AccountDropdown: React.FC<AccountProps> = ({ onClose }) => {
  return (
    <Dropdown
      title="Account"
      content="Account content goes here."
      onClose={onClose}
      icon={<CurrencyRupeeIcon className="h-6 w-6" />}
    />
  );
};

export default AccountDropdown;
