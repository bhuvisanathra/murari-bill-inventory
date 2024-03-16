// Login.js
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file for styling
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  let { registerUser } = useContext(AuthContext);
  const [mode, setMode] = useState("login");

  useEffect(() => {
    localStorage.removeItem("authTokens");
  }, []);

  return (
    <div className="login-container">
      <div className="signup__building_input_form">
        <header className="flex items-center justify-center  xl:flex-row xl:justify-center md:flex-row sm:justify-center sm:items-start mb-1">
          <div>
            <img
              src={logo}
              className="w-40 mb-2 h-auto sm:w-48 sm:h-auto md:w-56 md:h-auto lg:w-64 lg:h-auto xl:w-72 xl:h-auto mx-auto "
              alt="Logo"
            />
          </div>
        </header>
        <h2 className="font-bold text-3xl mb-5  text-center">
          {mode === "login" ? "Sign-In" : "Register"}
        </h2>
        {mode === "login" ? (
          <form
            onSubmit={loginUser}
            method="POST"
            className="flex flex-col items-center mt-5"
          >
            <input
              type="text"
              name="username"
              className="mb-3 p-2 border rounded"
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              className="mb-3 p-2 border rounded"
              placeholder="Password"
              required
            />
            <button
              className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
              type="submit"
            >
              Submit
            </button>
          </form>
        ) : (
          <form
            onSubmit={registerUser}
            method="POST"
            className="flex flex-col items-center mt-5"
          >
            <input
              type="email"
              name="email"
              className="mb-3 p-2 border rounded min-w-full"
              placeholder="Email"
            />

            <input
              type="text"
              name="username"
              className="mb-3 p-2 border rounded"
              placeholder="Username"
              required
            />
            <input
              type="password"
              name="password"
              className="mb-3 p-2 border rounded"
              placeholder="Password"
              required
            />
            <button
              className="bg-blue-500 min-w-full text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 mb-3 p-2 border rounded"
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
        <button
          className="bg-white-500 min-w-full text-blue-500 font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-white-500 hover:bg-blue-500 hover:text-white transition-all duration-300 mb-3 p-2 mt-3"
          type="button"
          onClick={() => setMode(mode === "login" ? "register" : "login")}
        >
          {mode === "login" ? "Register" : "Log-in"}
        </button>
      </div>
    </div>
  );
};

export default Login;
