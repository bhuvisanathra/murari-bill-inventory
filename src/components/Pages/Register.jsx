import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";

const Register = () => {
  const { registerUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailValid, setEmailValid] = useState(false);
  const [passwordConditions, setPasswordConditions] = useState({
    length: false,
    uppercase: false,
    number: false,
    symbol: false,
  });

  const validDomains = [
    "gmail.com",
    "hotmail.com",
    "yahoo.com",
    "outlook.com",
    "aol.com",
    "icloud.com",
  ];

  const validateEmail = (email) => {
    const emailPattern = new RegExp(
      `^[a-zA-Z0-9._%+-]+@(${validDomains.join("|")})$`
    );
    return emailPattern.test(email);
  };

  const checkPasswordConditions = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      symbol: /[!@#$%^&*]/.test(password),
    };
  };

  useEffect(() => {
    if (email) {
      const isValid = validateEmail(email);
      setEmailError(isValid ? "" : `Email must be a valid address`);
      setEmailValid(isValid);
    } else {
      setEmailError("");
      setEmailValid(false);
    }
  }, [email]);

  useEffect(() => {
    if (password) {
      setPasswordConditions(checkPasswordConditions(password));
    } else {
      setPasswordConditions({
        length: false,
        uppercase: false,
        number: false,
        symbol: false,
      });
    }
  }, [password]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValid && Object.values(passwordConditions).every(Boolean)) {
      registerUser({ email, username, password });
    }
  };

  return (
    <div className="login-container">
      <div className="signup__building_input_form">
        <header className="flex items-center justify-center xl:flex-row xl:justify-center md:flex-row sm:justify-center sm:items-start mb-1">
          <div>
            <img
              src={logo}
              className="w-40 mb-2 h-auto sm:w-48 sm:h-auto md:w-56 md:h-auto lg:w-64 lg:h-auto xl:w-72 xl:h-auto mx-auto"
              alt="Logo"
            />
          </div>
        </header>
        <h2 className="font-bold text-3xl mb-5 text-center">Register</h2>
        <form
          onSubmit={handleSubmit}
          method="POST"
          className="flex flex-col items-center mt-5"
        >
          <div className="w-full mb-3 relative">
            <input
              type="email"
              name="email"
              className={`mb-0 p-2 border rounded w-full ${
                email &&
                (emailError
                  ? "border-red-500"
                  : emailValid
                  ? "border-green-500"
                  : "")
              }`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {email && (
              <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
                {emailError ? (
                  <span className="text-red-500">✗</span>
                ) : (
                  emailValid && <span className="text-green-500">✓</span>
                )}
              </div>
            )}
            {email && (
              <div className="">
                {emailError ? (
                  <p className="text-red-500 text-sm">{emailError}</p>
                ) : (
                  emailValid && (
                    <p className="text-green-500 text-sm">Email is valid</p>
                  )
                )}
              </div>
            )}
          </div>

          <input
            type="text"
            name="username"
            className="mb-3 p-2 border rounded w-full"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div className="w-full mb-3 relative">
            <input
              type="password"
              name="password"
              className={`mb-0 p-2 border rounded w-full ${
                password &&
                (Object.values(passwordConditions).every(Boolean)
                  ? "border-green-500"
                  : "border-red-500")
              }`}
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password && (
              <ul className="mt-2 text-sm">
                <li
                  className={
                    passwordConditions.length
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  <span className="mr-2">
                    {passwordConditions.length ? "✓" : "✗"}
                  </span>
                  At least 8 characters long
                </li>
                <li
                  className={
                    passwordConditions.uppercase
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  <span className="mr-2">
                    {passwordConditions.uppercase ? "✓" : "✗"}
                  </span>
                  Contains at least one uppercase letter
                </li>
                <li
                  className={
                    passwordConditions.number
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  <span className="mr-2">
                    {passwordConditions.number ? "✓" : "✗"}
                  </span>
                  Contains at least one number
                </li>
                <li
                  className={
                    passwordConditions.symbol
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  <span className="mr-2">
                    {passwordConditions.symbol ? "✓" : "✗"}
                  </span>
                  Contains at least one symbol (!@#$%^&*)
                </li>
              </ul>
            )}
          </div>

          <button
            className="bg-blue-500 w-full text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 mb-3"
            type="submit"
            disabled={
              !emailValid || !Object.values(passwordConditions).every(Boolean)
            }
          >
            Submit
          </button>
        </form>
        <button
          className="bg-white-500 w-full text-blue-500 font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-white-500 hover:bg-blue-500 hover:text-white transition-all duration-300 mb-3 mt-3"
          type="button"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Register;
