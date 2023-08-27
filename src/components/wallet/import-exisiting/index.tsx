import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { SecretRecoveryPhase } from "./secret-recovery-phrase";

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
  const { login, signup, localPassword } = useLogin();

  // Define your state to hold form data
  
 
  
  const [password, setPassword] = useState("");
  const [secretPhrase, setSecretPhrase] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

 

  const handleNextStep = () => {
    setStep(step + 1);
  };

  // if (typeof localPassword === 'string') {
  //    setIsLoading(true);
  //    const isAuth =  signup(secretPhrase.toString(), password.toString());
  //    if (isAuth) {
  //      setIsLoading(false);
  //      console.log("isAuth", isAuth);
  //      navigate("/home");
  //      return;
  //    }
  //    toast.error("something went wrong in the validation");
  //    setIsLoading(false);
  // }


  const handleSubmit = async () => {
    setIsLoading(true);
    const isAuth = await signup(secretPhrase.toString(),password.toString());
    if (isAuth ) {
      setIsLoading(false);
      console.log("isAuth",isAuth)
      navigate("/home")
      return
    }
    toast.error("something went wrong in the validation")
    setIsLoading(false)
  }

    useEffect(() => {
      if (isSubmit) {
        handleSubmit();
      }
    }, [isSubmit, localPassword]);
 
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
      <ToastContainer />
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
        <div className="bg-[#242526] h-screen md:h-96">
          <Stages currentStep={step} />
          {renderForm()}
        </div>
      )}
    </div>
  );
}
