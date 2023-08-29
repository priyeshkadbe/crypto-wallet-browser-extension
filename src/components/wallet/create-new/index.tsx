import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { SecretRecoveryPhase } from "./security-phrase";
import { useLogin } from "@/providers/LoginProvider";
import { Password } from "./password";
import { RotatingLines } from "react-loader-spinner";

import Stages from "./stages";
import { ConfirmSecretRecoveryPhase } from "./confirm-security-phrase";
import { toast } from "react-toastify";

export default function ImportExisting() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [secretPhrase, setSecretPhrase] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const { signup, isLoggedIn, localPassword } = useLogin();


  const handleNextStep = () => {
    setStep(step + 1);
  };


  const handleSignup = async () => {
   
    setIsLoading(true);
    const isSignIn = await signup(secretPhrase.toString(), password.toString());
    if (isSignIn) {
      toast.success("logging");
      navigate("/home");
      setIsLoading(false);
    } else {
      toast.error("something went wrong in the signup process");
    }

  };

  useEffect(() => {
    if (isSubmit) {
      handleSignup();
    }
  }, [isSubmit]);

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <SecretRecoveryPhase
            setSecretPhrase={setSecretPhrase}
            onNext={handleNextStep}
          />
        );

      case 2:
        return <Password setPassword={setPassword} onNext={handleNextStep} />;
      case 3:
        return (
          <ConfirmSecretRecoveryPhase
            secretPhrase={secretPhrase}
            setIsSubmit={setIsSubmit}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0d0d0d] h-screen  md:flex md:flex-col md:justify-center  md:h-[768px] md:w-[768px] md:rounded-lg">
      {isLoading ? (
        <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      ) : (
        <>
          <Stages currentStep={step} />
          {renderForm()}
        </>
      )}
    </div>
  );
}
