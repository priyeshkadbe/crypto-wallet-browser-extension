import React, { useState } from "react";
import {
  CurrencyRupeeIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  LockClosedIcon,
  EllipsisVerticalIcon,
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";
import NetworkDropdown from "./dropdown/NetworkDropdown";
import AccountDropdown from "./dropdown/AccountDropdown";
import MenuDropdown from "./dropdown/MenuDropdown";
import DropdownButton from "./dropdown/DropdownButton"; // Import the DropdownButton component

interface ModalInfo {
  title: string;
  content: string;
  showModal: boolean;
}

function Navbar() {
  const [selectedOption, setSelectedOption] = useState<string>("tokens");
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const openModal = (modalName: string) => {
    setActiveModal(modalName);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  const renderModal = () => {
    if (!activeModal) return null;

    switch (activeModal) {
      case "network":
        return <NetworkDropdown onClose={closeModal} />;
      case "accounts":
        return <AccountDropdown onClose={closeModal} />;
      case "menu":
        return <MenuDropdown onClose={closeModal} />;
      default:
        return null;
    }
  };

  const icons: Record<string, React.ReactNode> = {
    network: <GlobeAltIcon className="h-8 w-8 " />,
    accounts: <UserCircleIcon className="h-8 w-8  " />,
    menu: <EllipsisVerticalIcon className="h-8 w-8" />,
  };

  return (
    <div>
      <div className="bg-[#4C4AA1] w-screen flex justify-between items-center h-[80px] px-4 relative">
        <div className="flex w-full justify-between gap-1">
          {Object.keys(icons).map((key) => (
            <DropdownButton
              key={key}
              icon={icons[key]}
              onClick={() => openModal(key)}
            />
          ))}
        </div>
      </div>
      {renderModal()}
    </div>
  );
}

export default Navbar;
