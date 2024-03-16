import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext.jsx";

const Navbar = () => {
  const { logoutUser, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [role, setRole] = useState(
    JSON.parse(localStorage.getItem("authTokens")).user.authorities[0].authority
  );

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="bg-gray-800 p-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <button className="text-white mr-4 md:hidden" onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
            <span
              className="text-white font-semibold text-3xl min-w-fit"
              onClick={() => navigate("/home")}
              style={{ cursor: "pointer" }}
            >
              Murari Farshan Gruh
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="rounded-md text-white font-bold py-2 px-3 min-w-fit bg-blue-500 hover:bg-transparent hover:text-white-500 transition-all duration-300"
              onClick={() => navigate("/home")}
            >
              Add Bill
            </button>
            {role == "ADMIN" ? (
              <button
                className="rounded-md min-w-fit text-white  font-bold py-2 px-3 bg-blue-500 hover:bg-transparent hover:text-white-500 transition-all duration-300"
                onClick={() => navigate("/invoices")}
              >
                Past Bills
              </button>
            ) : null}
            <button
              className="rounded-md text-white min-w-fit font-bold py-2 px-3 bg-blue-500 hover:bg-transparent hover:text-white-500 transition-all duration-300"
              onClick={() => navigate("/product")}
            >
              Products
            </button>
            {role == "ADMIN" ? (
              <button
                className="rounded-md text-white min-w-fit font-bold py-2 px-3 bg-blue-500 hover:bg-transparent hover:text-white-500 transition-all duration-300"
                onClick={() => navigate("/summary")}
              >
                Analysis
              </button>
            ) : null}

            <button
              className="rounded-md text-white min-w-fit font-bold py-2 px-3 bg-blue-500 hover:bg-transparent hover:text-white-500 transition-all duration-300"
              onClick={logoutUser}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      {showMenu && (
        <div className="md:hidden mt-4">
          <button
            className="block rounded-md text-white font-bold py-2 px-4 w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-sm"
            onClick={() => navigate("/home")}
          >
            Add Bill
          </button>
          {role == "ADMIN" ? (
            <button
              className="block rounded-md text-white font-bold py-2 px-4 w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-sm mt-2"
              onClick={() => navigate("/invoices")}
            >
              Past Bills
            </button>
          ) : null}
          <button
            className="block rounded-md text-white font-bold py-2 px-4 w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-sm mt-2"
            onClick={() => navigate("/product")}
          >
            Products
          </button>
          {role == "ADMIN" ? (
            <button
              className="block rounded-md text-white font-bold py-2 px-4 w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-sm mt-2"
              onClick={() => navigate("/summary")}
            >
              Report
            </button>
          ) : null}
          <button
            className="block rounded-md text-white font-bold py-2 px-4 w-full bg-blue-500 hover:bg-blue-600 transition-colors duration-300 text-sm mt-2"
            onClick={logoutUser}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
