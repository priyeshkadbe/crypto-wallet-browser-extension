import React, { ChangeEvent } from 'react';

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
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold p-4">Create Password</h1>
      <h4 className="text-xl font-normal px-4 ">
        This password will unlock your Crypto wallet only on this device. Crypto
        Wallet cannot recover this password.
      </h4>
      <div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="•••••••••"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="confirm_password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Confirm password
          </label>
          <input
            type="password"
            id="confirm_password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={onChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        Create a new wallet
      </button>
    </div>
  );
};

export default Password;
