import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { SecretRecoveryPhase } from "./secret-recovery-phrase";
import {Password} from "./password";
import { mnemonicToSeed } from "ethers/lib/utils";
import Stages from "./stages";

interface FormData {
  password: string;
  secretPhrase: string;
}


export default function ImportExisting() {

  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // Define your state to hold form data
  const [formData, setFormData] = useState<FormData>({
    password: "",
    secretPhrase: "",
  });

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const { password, mnemonic } = e.target;
    // setFormData({
    //   ...formData,
    //   [mnemonic]: mnemonic,
    // });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission or other actions here
    navigate("/home");
    console.log(formData);
  };

  const handleStageClick = (stepNumber: number) => {
    // Handle going back to a previous stage
    // For example, if stepNumber is 1 and currentStep is 3, setStep(1)
    if (stepNumber < step) {
      setStep(stepNumber);
    }
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <SecretRecoveryPhase
            secretPhrase={formData.secretPhrase}
            onNext={handleNextStep}
          />
        );
      
      case 2:
        return (
          <Password
            password={formData.password}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <Stages currentStep={step} onStageClick={handleStageClick} />
        <form>{renderForm()}</form>
      </div>
    </div>
  );
}
