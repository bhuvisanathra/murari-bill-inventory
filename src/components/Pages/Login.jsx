// @ts-ignore
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css"; // Import your CSS file for styling
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  let { registerUser } = useContext(AuthContext);
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

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
        <h2 className="font-bold text-3xl mb-5  text-center">Sign-In</h2>

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
            autocomplete="off"
          />
          <input
            type="password"
            name="password"
            className="mb-3 p-2 border rounded"
            placeholder="Password"
            required
            autocomplete="off"
          />
          <button
            className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
            type="submit"
          >
            Submit
          </button>
        </form>
        <button
          className="bg-white-500 min-w-full text-blue-500 font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-white-500 hover:bg-blue-500 hover:text-white transition-all duration-300 mb-3 p-2 mt-3"
          type="button"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
