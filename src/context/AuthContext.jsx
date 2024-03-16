import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    if (data && data.jwt) {
      localStorage.setItem("authTokens", JSON.stringify(data)); // Store the JWT token in local storage
      setAuthTokens(data.jwt);
      setUser(jwtDecode(data.jwt)); // Decode the JWT token
      toast.success(`Welcome!`);
      navigate("/home");
    } else {
      toast.error("Invalid username or password!"); // Display toast message
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
    const data = await response.json();

    if (response.ok) {
      // Wait for the role state to be set before displaying the success message
      setRole(data.role); // Assuming the role is returned in the response
      toast.success("Welcome");
      setTimeout(() => {
        navigate("/home");
      }, 2000);
    } else {
      toast.error("Registration failed!"); // Display toast message
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
    <AuthContext.Provider value={contextData}>
      <ToastContainer
        position="top-right"
        className="min-w-fit"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      {children}
    </AuthContext.Provider>
  );
};
