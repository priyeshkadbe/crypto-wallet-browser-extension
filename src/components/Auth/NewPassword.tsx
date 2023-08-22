import { useNavigate } from "react-router-dom"; // Import useHistory from React Router
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

export default function NewPassword() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-start ">
        <button onClick={() => navigate("/import-existing")}>
          <ArrowLeftIcon className="h-6 w-6" />
        </button>
      </div>
      <h1 className="text-3xl font-semibold p-4">Create Password</h1>
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
        // onClick={onNext}
        onClick={() => navigate("/home")}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Restore
      </button>
    </div>
  );
}
