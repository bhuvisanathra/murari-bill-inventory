import React from "react";
import { MdDelete } from "react-icons/md";

const CustomDialog = ({ isOpen, onClose, user, onDelete }) => {
  return (
    <div
      className={`fixed z-10 inset-0 overflow-y-auto ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
        <div className="relative bg-white p-8 rounded-lg max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">User Information</h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 5.293a1 1 0 00-1.414 1.414L10 10.414l-3.293-3.293a1 1 0 10-1.414 1.414L8.586 12 5.293 15.293a1 1 0 101.414 1.414L10 13.414l3.293 3.293a1 1 0 001.414-1.414L11.414 12l3.293-3.293a1 1 0 000-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="text-gray-800">
            <p className="mb-2">
              <span className="font-semibold">User ID:</span> {user?.userId}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Username:</span> {user?.username}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="mb-2">
              <span className="font-semibold">Role:</span>{" "}
              {user?.authorities[user.userId - 1].authority}
            </p>
          </div>
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => onDelete(user.userId)}
              className="flex items-center justify-center space-x-1 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none"
            >
              <MdDelete className="text-white" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDialog;
