import React, { ChangeEvent, useState } from "react";
import {useNavigate}from "react-router-dom"
import { EyeIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

interface PasswordProps {
  password: string;
  confirmPassword: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onNext: () => void;
}

const Password: React.FC<PasswordProps> = ({
  password,
  confirmPassword,
  onChange,
  onNext,
}) => {

  const navigate = useNavigate()
  

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold p-4">Create Password</h1>
      <h4 className="text-xl font-normal px-4 ">
        This password will unlock your Crypto wallet only on this device. Crypto
        Wallet cannot recover this password.
      </h4>
      <div className="m-4">
        <div className="m-3">
          <label className="block m-2 text-sm font-medium text-gray-900 ">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="m-3">
          <label className="block m-2 text-sm font-medium text-gray-900 ">
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="•••••••••"
            required
          />
        </div>
      </div>
      <button
        type="button"
        onClick={onNext}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        next
      </button>
    </div>
  );
};

export default Password;
