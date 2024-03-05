import React from "react";
import { useNavigate } from "react-router-dom";

const SwitchButtons = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex justify-center m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl  ">
        <button
          className="rounded shadow flex-grow bg-blue-500 text-white font-bold py-2 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 mr-2"
          onClick={() => navigate("/")}
        >
          Generate New Invoice
        </button>
        <button
          className="rounded shadow flex-grow bg-blue-500 text-white font-bold py-2 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 ml-2"
          onClick={() => navigate("/viewInvoice")}
        >
          Previous Invoice
        </button>
      </div>
    </>
  );
};

export default SwitchButtons;
