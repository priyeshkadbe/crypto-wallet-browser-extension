import React from "react";

interface Stage {
  number: number;
  text: string;
}

interface WalletStagesProps {
  currentStep: number;
  onStageClick: (stepNumber: number) => void; // Add a callback for stage click
}

export default function WalletStages({
  currentStep,
  onStageClick,
}: WalletStagesProps) {
  const stages: Stage[] = [
    { number: 1, text: "create password" },
    { number: 2, text: "secure wallet" },
    { number: 3, text: "confirm secret recovery phrase" },
  ];

  return (
    <div className="flex flex-row justify-between items-center m-4">
      {stages.map((stage: Stage) => (
        <div className="flex flex-col justify-center" key={stage.number}>
          <div
            className={`w-12 h-12 flex items-center justify-center text-blue-500 border border-blue-500 rounded-full relative ${
              stage.number === currentStep ? "bg-blue-500" : ""
            }`}
            onClick={() => onStageClick(stage.number)} // Handle stage click
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-lg font-bold">
              {stage.number}
            </div>
            <div className="absolute top-1/2 left-full transform -translate-y-1/2 h-px bg-gray-300 w-4"></div>
          </div>
          <p className="whitespace-normal">{stage.text}</p>
        </div>
      ))}
    </div>
  );
}
