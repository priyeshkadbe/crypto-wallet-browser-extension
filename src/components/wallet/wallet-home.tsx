import React, { useState } from "react";
import Password from "../wallet/password";
import SecureWallet from "./secure-wallet";
import ConfirmSecretRecoveryPhase from "./confirm-secret-recovery-phrase";
import WalletStages from "./wallet-stages";
import {useNavigate} from "react-router-dom"
export default function WalletHome() {
  const [step, setStep] = useState(1);
  const navigate=useNavigate()

  // Define your state to hold form data
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    secretPhrase: "",
    confirmSecretPhrase: Array<string>(12).fill(""),
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
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform form submission or other actions here
    navigate("/home")
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
          <Password
            password={formData.password}
            confirmPassword={formData.confirmPassword}
            onChange={handleChange}
            onNext={handleNextStep}
          />
        );
      case 2:
        return (
          <SecureWallet
            secretPhrase={formData.secretPhrase}
            onChange={handleChange}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
          />
        );
      case 3:
        return (
          <ConfirmSecretRecoveryPhase
            inputValues={formData.confirmSecretPhrase}
            onChange={(index, value) => {
              // Update the specific input value
              const updatedInputValues = [...formData.confirmSecretPhrase];
              updatedInputValues[index] = value;
              setFormData({
                ...formData,
                confirmSecretPhrase: updatedInputValues,
              });
            }}
            onConfirm={(e) => {
              handleSubmit(e);
              // Handle the form submission here if needed
            }} // Ensure both have the same event type
          />
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <div>
        <WalletStages currentStep={step} onStageClick={handleStageClick} />
        <form>{renderForm()}</form>
      </div>
    </div>
  );
}
