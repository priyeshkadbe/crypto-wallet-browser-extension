import React from "react";

interface DropdownButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({ icon, onClick }) => {
  return (
    <button
      className="flex flex-col justify-center items-center p-1"
      onClick={onClick}
    >
      {icon}
    </button>
  );
};

export default DropdownButton;
