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
  const [secretPhrase, setSecretPhrase] = useState("");
  const [password, setPassword] = useState("")
  const [isSubmit, setIsSubmit] = useState(false);

  const { signup,isLoggedIn } = useLogin();

  // useEffect(() => {
  //    console.log("ImportExisting re-rendered with isLoading:", isLoading);
  // },[isSubmit])
  // Define your state to hold form data
  // const [formData, setFormData] = useState<FormData>({
  //   password: "",
  //   secretPhrase: "",
  // });

  useEffect(() => {}, [isLoggedIn]);


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
    // setIsLoading(true);
    console.log("data sending",secretPhrase.toString(), password.toString());
      const isSignIn = await signup(secretPhrase.toString(),password.toString());
      console.log("isSignIn", isSignIn);
      if (isSignIn) {
        toast.success("logging")
        console.log("yes")
        // setIsLoggedIn(true);
        navigate("/home")
        // setIsLoading(false)
      }
      toast.error("something went wrong in the singup process")
      // setIsLoading(false)
  };


  if (isSubmit) {
    handleSignup();
  }

  // const validateSecretPhrase = () => {};

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
        return (
          <Password
            setPassword={setPassword}
            onNext={handleNextStep}
          />
        );
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
