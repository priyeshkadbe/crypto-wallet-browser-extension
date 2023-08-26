import React from "react";

interface DropdownButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  text?: string;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  icon,
  onClick,
  text,
}) => {
  return (
    <button
      className="flex flex-col justify-center items-center p-1"
      onClick={onClick}
    >
      <div className="flex gap-2 justify-center items-center">
        <h1>{text}</h1>
        {icon}
      </div>
    </button>
  );
};

export default DropdownButton;
