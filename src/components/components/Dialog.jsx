import React from "react";

const Dialog = ({ showDialog, setShowDialog }) => {
  const handleClose = () => {
    setShowDialog(false);
  };

  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-red-800">Error</h2>
        </div>
        <p className="text-black-600 mb-4 font-bold">
          Please fill in all the required fields.
        </p>
        <div className="flex justify-center">
          {" "}
          {/* Align button in center */}
          <button
            onClick={handleClose}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
