import React, { useState,useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { SecretRecoveryPhase } from "./security-phrase";
import {useLogin} from "@/providers/LoginProvider"
import { Password } from "./password";
import { RotatingLines } from "react-loader-spinner";

import Stages from "./stages";
import { ConfirmSecretRecoveryPhase } from "./confirm-security-phrase";
import { toast } from "react-toastify";

interface FormData {
  password: string;
  secretPhrase: string;
}

export default function ImportExisting() {
  const [step, setStep] = useState(1);
   const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { signup, isLoggedIn, setIsLoggedIn } = useLogin();
  useEffect(() => {
     console.log("ImportExisting re-rendered with isLoading:", isLoading);

  },[isLoading])
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


  const handleSignup = async () => {
    console.log("running2");
    setIsLoading(true);
 
      
      const isSignIn = await signup(formData.secretPhrase, formData.password);
      console.log("isSignIn", isSignIn);
      if (isSignIn) {
        toast.success("logging")
        console.log("yes")
        // setIsLoggedIn(true);
        navigate("/home")
        setIsLoading(false)
      }
      toast.error("something went wrong in the singup process")
      setIsLoading(false)
    
    
  };

  // const validateSecretPhrase = () => {};

  const handlePrevStep = () => {
    setStep(step - 1);
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
      case 3:
        return (
          <ConfirmSecretRecoveryPhase
            secretPhrase={formData.secretPhrase}
            onNext={handleSignup}
          />
        );
      default:
        return null;
    }
  };
  // if (isLoading) {
  //   return (
  //     <RotatingLines
  //       strokeColor="grey"
  //       strokeWidth="5"
  //       animationDuration="0.75"
  //       width="96"
  //       visible={true}
  //     />
  //   );
  // }
  return (
    <div>
      <div>
        <Stages currentStep={step} />
        {isLoading ? (
          <RotatingLines
            strokeColor="grey"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        ) : (
          renderForm()
        )}
      </div>
    </div>
  );
}
