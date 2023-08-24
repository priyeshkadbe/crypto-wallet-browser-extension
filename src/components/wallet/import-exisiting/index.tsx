import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { SecretRecoveryPhase } from "./secret-recovery-phrase";
import {
  checkAccountExists,
  decryptMnemonic,
  encryptMnemonic,
  encryptPassword,
  storePassword,
  storeMnemonics,
  createWallet
} from "@/services/accountServices";
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


  // const handleNextStep = async () => {
  //   try {
  //     const accountExists = await checkAccountExists(
  //       formData.secretPhrase.toString()
  //     );
  //     if (accountExists) {
  //       setStep(step + 1);
  //     } else {
  //       console.log("Wrong seed phrase");
  //     }
  //   } catch (error) {
  //     console.error("Error checking account existence:", error);
  //   }
  // };

  const saveToStorage = async () => {
    storePassword(await encryptPassword(formData.password));

    storeMnemonics(
      await encryptMnemonic(
        formData.secretPhrase,
        formData.password
      )
    );
    // let {address,account} = await createWallet(formData.secretPhrase);
    //await console.log('wallet',address)
    await console.log(localStorage.getItem("password"));
    await console.log(localStorage.getItem("mnemonic"));
    
    navigate('/home');
  };


  const validateSecretPhrase = () => {
    
  }


  const handlePrevStep = () => {
    setStep(step - 1);
  };


  const handleStageClick = (stepNumber: number) => {

    if (stepNumber < step) {
      setStep(stepNumber);
    }
  };


  const handleRecoverPhraseSubmit = () => {
    
  }

  const handlePasswordSubmit = () => {
    
  }

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
            onNext={saveToStorage}
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
        {renderForm()}
      </div>
    </div>
  );
}
