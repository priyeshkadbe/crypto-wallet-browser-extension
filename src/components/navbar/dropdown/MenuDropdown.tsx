// MenuDropdown.tsx
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

interface MenuProps {
  onClose: () => void;
}

const MenuDropdown: React.FC<MenuProps> = ({ onClose }) => {
  return (
    <Dropdown
      title="Menu"
      content="Menu content goes here."
      onClose={onClose}
      icon={<EllipsisVerticalIcon className="h-6 w-6" />}
    />
  );
};

export default MenuDropdown;
