import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useHistory from React Router

export default function EnterRecoveryPhrase() {
  const numberOfRows = 4; // Number of rows
  const inputsPerRow = 3; // Number of inputs per row
  const totalInputs = numberOfRows * inputsPerRow;

  const navigate=useNavigate()

  const [inputValues, setInputValues] = useState<string[]>(
    Array(totalInputs).fill("")
  );
  const [showPasswords, setShowPasswords] = useState<boolean[]>(
    Array(totalInputs).fill(false)
  );

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number
  ) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text");

    // Split the pasted text into words
    const words = pastedText.split(" ");

    // Update the input values with the words
    const newInputValues = [...inputValues];
    words.slice(0, totalInputs).forEach((word, i) => {
      newInputValues[i] = word;
    });

    setInputValues(newInputValues);
  };

  const togglePasswordVisibility = (index: number) => {
    const newShowPasswords = [...showPasswords];
    newShowPasswords[index] = !newShowPasswords[index];
    setShowPasswords(newShowPasswords);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold p-4 text-center">
        Enter The Secret Recovery Phrase
      </h1>

      <div className="grid grid-cols-3 gap-4 m-2">
        {inputValues.map((value, index) => (
          <div key={index} className="flex items-center space-x-2">
            <span>{index + 1}.</span>
            <input
              type={showPasswords[index] ? "text" : "password"}
              value={value}
              onChange={(e) => {
                const newInputValues = [...inputValues];
                newInputValues[index] = e.target.value;
                setInputValues(newInputValues);
              }}
              onPaste={(e) => handlePaste(e, index)}
              className="border border-gray-300 p-2 rounded-lg w-full px-2"
            />
            <button
              onClick={() => togglePasswordVisibility(index)}
              className=" "
            >
              {showPasswords[index] ? (
                <EyeIcon className="h-4 w-4" />
              ) : (
                <EyeSlashIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div>
        <button
          type="button"
          // onClick={onConfirm as () => void} // Cast to correct event type
          // Pass event argument if needed
          onClick={()=>navigate("/new-password")}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Next
        </button>
      </div>
    </div>
  );
}
