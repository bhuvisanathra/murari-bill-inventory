import React from "react";

const ConfirmationDialog = ({ message, onCancel, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl">
        <p className="mb-5">{message}</p>
        <div className="flex flex-col sm:flex-row justify-between">
          <button
            onClick={onCancel}
            className="w-full sm:w-auto mb-2 sm:mb-0 px-4 py-2 bg-gray-500 text-white rounded-md mr-0 sm:mr-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="w-full sm:w-auto px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
