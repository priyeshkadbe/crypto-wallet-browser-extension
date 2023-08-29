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

  // useEffect(() => {
  //    console.log("ImportExisting re-rendered with isLoading:", isLoading);
  // },[isSubmit])
  // Define your state to hold form data
  // const [formData, setFormData] = useState<FormData>({
  //   password: "",
  //   secretPhrase: "",
  // });

  // useEffect(() => {}, [isLoggedIn, localPassword]);

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
    console.log("data sending", secretPhrase.toString(), password.toString());
    const isSignIn = await signup(secretPhrase.toString(), password.toString());
    console.log("isSignIn", isSignIn);
    if (isSignIn) {
      toast.success("logging");
      console.log("yes");
      navigate("/home");
      setIsLoading(false);
    } else {
      toast.error("something went wrong in the singup process");
    }
    // setIsLoading(false)
  };

  useEffect(() => {
    if (isSubmit) {
      handleSignup();
    }
  }, [isSubmit]);

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
  // if (isLoading) {
  //   return (
  //     <div className="flex items-center justify-center">
  //       <RotatingLines
  //         strokeColor="white"
  //         strokeWidth="5"
  //         animationDuration="0.75"
  //         width="96"
  //         visible={true}
  //       />
  //     </div>
  //   );
  // }
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
