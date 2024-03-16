import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

import { useNavigate } from "react-router-dom";
import BASE_URL from "../services/urls";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState();
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const userRole =
        user && user.user && user.user.authorities.length > 0
          ? user.user.authorities[0].authority
          : null;
      setRole(userRole);
      // console.log(userRole);
    }
  }, [user]);

  const loginUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });

    const data = await response.json();

    console.log("Data received from server:", data.jwt); // Log the JWT token received from the server

    if (data) {
      localStorage.setItem("authTokens", JSON.stringify(data)); // Store the JWT token in local storage
      setAuthTokens(data.jwt);
      if (typeof data.jwt === "string") {
        setUser(jwtDecode(data.jwt)); // Decode the JWT token
      } else {
        console.error("Invalid token format:", data.jwt);
      }
      navigate("/home");
    } else {
      alert("Something went wrong while logging in the user!");
    }
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
        email: e.target.email.value,
      }),
    });
    // console.log(response.body);
    const data = await response.json();
    // console.log("Data received from server:", data); // Log the JWT token received from the server

    if (data) {
      navigate("/home");
    } else {
      alert("Something went wrong while logging in the user!");
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    navigate("/sign-in");
  };

  const contextData = {
    user: user,
    authTokens: authTokens,
    loginUser: loginUser,
    registerUser: registerUser,
    logoutUser: logoutUser,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
