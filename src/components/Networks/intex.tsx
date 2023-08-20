import { CurrencyDollarIcon } from "@heroicons/react/20/solid";

interface NetworkProps {
  onClose: () => void; // Function to close the modal
}

const Network: React.FC<NetworkProps> = ({ onClose }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-medium text-gray-900">
            Select A Network
          </h3>
          <button
            type="button"
            className="text-blue-500 text-lg  ml-auto inline-flex justify-center items-center"
            onClick={() => onClose()}
          >
            close
          </button>
        </div>

        <div className="flex flex-col items-start p-6 space-x-2 border-t border-gray-200 rounded-b">

          <div className="flex items-center justify-start">
            <CurrencyDollarIcon className="h-8 w -8" />
            <h2 className="text-lg ">Ethereum</h2>
          </div>
        </div>
      </div>
    </div>
  );
};
