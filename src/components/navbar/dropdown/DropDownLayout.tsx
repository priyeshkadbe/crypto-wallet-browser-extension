import React from "react";

interface DropDownLayoutProps {
  title: string;
  content: React.JSX.Element;
  onClose: () => void;
  icon: React.ReactNode;
}

const DropDownLayout: React.FC<DropDownLayoutProps> = ({
  title,
  content,
  onClose,
  icon,
}) => {
  return (
    <div className="fixed px-2 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center bg-gray-500 bg-opacity-50">
      <div className="relative w-full  bg-white rounded-lg shadow">
        <div className="flex items-center justify-between p-5 border-b rounded-t">
          <h3 className="text-xl font-medium text-gray-900">{title}</h3>
          <button
            type="button"
            className="text-blue-500 text-lg ml-auto inline-flex justify-center items-center"
            onClick={onClose}
          >
            close
          </button>
        </div>
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-gray-500">{content}</p>
        </div>
        {/* <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            onClick={onClose}
          >
            I accept
          </button>
          <button
            type="button"
            className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900"
            onClick={onClose}
          >
            Decline
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default DropDownLayout;
