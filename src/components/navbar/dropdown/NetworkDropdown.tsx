// NetworkDropdown.tsx
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
interface NetworkProps {
  onClose: () => void;
}

const NetworkDropdown: React.FC<NetworkProps> = ({ onClose }) => {
  return (
    <Dropdown
      title="Network"
      content="Network content goes here."
      onClose={onClose}
      icon={<GlobeAltIcon className="h-6 w-6" />}
    />
  );
};

export default NetworkDropdown;
