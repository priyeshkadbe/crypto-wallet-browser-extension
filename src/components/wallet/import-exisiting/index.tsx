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
  
 
  
  const [password, setPassword] = useState<string|null>(null);
  const [secretPhrase, setSecretPhrase] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

 

  const handleNextStep = () => {
    setStep(step + 1);
  };




  const handleSubmit = async () => {
    
    if (password !== null) {
      setIsLoading(true);
      const isAuth = await signup(secretPhrase, password);
      if (isAuth) {
        setIsLoading(false);
        navigate("/home");
        return;
      }
      toast.error("something went wrong in the validation");
      setIsLoading(false);
      return
    }
    toast.error("something is wrong")
    
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
      {/* {isLoading ? (
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
        
      )} */}
      {/* <div className="bg-[#0d0d0d] h-screen  md:flex md:flex-col md:justify-center  md:h-[768px] md:w-[768px] md:rounded-lg">
        <Stages currentStep={step} />
        {renderForm()}
      </div> */}
      <div className="bg-[#0d0d0d] h-screen  md:flex md:flex-col md:justify-center md:items-center md:h-[768px] md:w-[768px] md:rounded-lg">
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
    </div>
  );
}
