// AccountDropdown.tsx
import React, { useEffect, useState } from "react";
import DropDownLayout from "./DropDownLayout";
import {
  CurrencyRupeeIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  LockClosedIcon,
  EllipsisVerticalIcon,
  ArrowUpRightIcon,
  ArrowsRightLeftIcon,
  UserCircleIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/20/solid";
import { useLogin } from "@/providers/LoginProvider";
import { ToastContainer, toast } from "react-toastify"

interface AccountProps {
  onClose: () => void;
}

const AccountContent = () => {
  const [addNewAccount, setNewAccount] = useState(false);
  const [accountName, setAccountName] = useState<string|null>(null);

  const { account, addAccount,wallet } = useLogin();

  useEffect(() => {}, [account]);

  useEffect(() => {}, [addNewAccount]);
  // if (addNewAccount) {
  //     return (
  //       <div className="flex flex-col w-full  gap-1">
  //        <h1>hello world</h1>
  //       </div>
  //     );
  //   }
  // return (
  //       <div className="flex flex-col w-full  gap-1">
  //   <div className="overflow-y-auto flex  flex-col  gap-2">
  //     <button className="flex justify-start items-start  flex-grow gap-2 p-2 border border-gray-600 w-full">
  //       <CurrencyDollarIcon className="h-8 w-8" />
  //       <div className="flex flex-col">
  //         <h2 className="text-lg font-medium">Account 1</h2>
  //         <h2 className="text-xs ">
  //           {account?.slice(0, 7)}....{account?.slice(-4)}
  //         </h2>
  //       </div>
  //     </button>
  //     {/* <button className="flex justify-start flex-grow items-start gap-2 p-2 border border-gray-600 w-full">
  //     <CurrencyDollarIcon className="h-8 w-8" />
  //     <div className="flex flex-col">
  //       <h2 className="text-lg font-medium">Account 1</h2>
  //       <h2 className="text-lg ">0xerererer</h2>
  //     </div>
  //   </button> */}
  //   </div>
  //   <button
  // onClick={()=>setNewAccount(true)}
  //     className="flex justify-center items-center text-blue-500 "
  //   >
  //     Add New Account
  //   </button>
  //       </div>
  //     );
  // }


  const handleAddAccount = async () => {

    if (accountName === null || accountName=== "") {
      toast.error("account name cannot be empty")
      return
    }

    if (accountName !== null || accountName !== "") {
      const isAccountAdded = await addAccount(accountName!);
      if (isAccountAdded) {
        toast.success("account added ")
        return 
      }
    } 
    
  }

  return (
    // <div className="flex flex-col w-full gap-1"></div>
    //   {addNewAccount ? (
    // <div className="flex flex-col w-full gap-1">
    //   <div className="overflow-y-auto flex  flex-col  gap-2">
    //   <h1>hello world</h1>
    //   </div>
    // </div>
    //   ) : (
    // <div className="flex flex-col w-full gap-1">
    //   <div className="overflow-y-auto flex  flex-col  gap-2">
    //     <button className="flex justify-start items-start  flex-grow gap-2 p-2 border border-gray-600 w-full">
    //       <CurrencyDollarIcon className="h-8 w-8" />
    //       <div className="flex flex-col">
    //         <h2 className="text-lg font-medium">Account 1</h2>
    //         <h2 className="text-xs ">
    //           {account?.slice(0, 7)}....{account?.slice(-4)}
    //         </h2>
    //       </div>
    //     </button>
    //     {/* <button className="flex justify-start flex-grow items-start gap-2 p-2 border border-gray-600 w-full">
    //     <CurrencyDollarIcon className="h-8 w-8" />
    //     <div className="flex flex-col">
    //       <h2 className="text-lg font-medium">Account 1</h2>
    //       <h2 className="text-lg ">0xerererer</h2>
    //     </div>
    //   </button> */}
    //   </div>
    //     <button
    //       type="button"
    //     onClick={() => !setNewAccount}
    //     className="flex justify-center items-center text-blue-500 "
    //   >
    //     Add New Account
    //   </button>
    // </div>
    //   )}
    // </div>
    <div>
      <div>
        {addNewAccount ? (
          <div className="flex flex-col w-full gap-1">
            <div className="overflow-y-auto flex my-2  flex-col justify-center items-center  gap-2">
              <input
                placeholder="account name"
                className="bg-gray-600 rounded-md border-none outline-none w-2/3 py-2 px-4  text-white"
                type="text"
                onChange={(e) => setAccountName(e.target.value)}
              />
            </div>
            <div className="flex justify-evenly my-2">
              <button
                type="button"
                onClick={() => setNewAccount(!addNewAccount)}
                className="flex justify-center items-center 
                text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700
                "
              >
                cancel
              </button>
              <button
                type="button"
                onClick={() => handleAddAccount()}
                className="flex justify-center items-center
                text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800
                "
              >
                Add
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col w-full gap-1">
            <div className="overflow-y-auto flex py-4 px-2  max-h-40 flex-col  gap-2">
              <button className="flex justify-start items-center  flex-grow gap-2 p-2 border border-gray-600 w-full">
                <CurrencyDollarIcon className="h-8 w-8" />
                <div className="flex flex-col justify-start items-start">
                  <h2 className="text-lg font-medium">Account 1</h2>
                  <h2 className="text-md  ">
                    {account?.slice(0, 7)}....{account?.slice(-4)}
                  </h2>
                </div>

                <EllipsisVerticalIcon className="h-8 w-8 ml-auto" />
              </button>

              {/* <button className="flex justify-start flex-grow items-start gap-2 p-2 border border-gray-600 w-full">
                <CurrencyDollarIcon className="h-8 w-8" />
                <div className="flex flex-col">
                  <h2 className="text-lg font-medium">Account 1</h2>
                  <h2 className="text-lg ">0xerererer</h2>
                </div>
              </button> */}
            </div>
            <button
              type="button"
              onClick={() => setNewAccount(!addNewAccount)}
              className="flex justify-center items-center text-blue-500 "
            >
              Add New Account
            </button>
          </div>
        )}
      </div>
      {/* <span>
        <button onClick={() => setNewAccount(!addNewAccount)}>click me</button>
      </span> */}
    </div>
  );
};

const AccountDropdown: React.FC<AccountProps> = ({ onClose }) => {
  return (
    <DropDownLayout
      title="Select Account"
      content={<AccountContent />}
      onClose={onClose}
      icon={<UserCircleIcon className="h-6 w-6" />}
    />
  );
};

export default AccountDropdown;
