import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { SecretRecoveryPhase } from "./secret-recovery-phrase";
import {
  checkAccountExists,
  decryptMnemonic,
  encryptMnemonic,
  encryptPassword,
  storePassword,
  storeMnemonics,
  createWallet,
} from "@/services/accountServices";
import { Password } from "./password";
import { mnemonicToSeed } from "ethers/lib/utils";
import Stages from "./stages";
import { useLogin } from "@/providers/LoginProvider"
import { RotatingLines } from "react-loader-spinner";
import { ToastContainer,toast } from "react-toastify";


export default function ImportExisting() {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const {login,signup}=useLogin()

  // Define your state to hold form data
  
 
  
  const [password, setPassword] = useState("");
  const [secretPhrase, setSecretPhrase] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

   useEffect(() => {
     if (isSubmit) {
       handleSubmit();
     }
   }, [isSubmit]);

  const handleNextStep = () => {
    setStep(step + 1);
  };




  const handleSubmit = async () => {
    setIsLoading(true);
    const isAuth = await signup(secretPhrase.toString(),password.toString());
    if (isAuth) {
      setIsLoading(false);
      console.log("isAuth",isAuth)
      navigate("/home")
      return
    }
    toast.error("something went wrong in the validation")
    setIsLoading(false)

  }

 
  const handleStageClick = (stepNumber: number) => {
    if (stepNumber < step) {
      setStep(stepNumber);
    }
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
        return <Password setPassword={setPassword} setIsSubmit={setIsSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <ToastContainer/>
      {isLoading ? (
        <div className="justify-center items-center">
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div>
      ) : (
        <div>
          <Stages currentStep={step} />
          {renderForm()}
        </div>
      )}
    </div>
  );
}
