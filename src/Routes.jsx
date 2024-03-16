import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import ViewProductList from "./components/Pages/ViewProductList";
import NotFoundPage from "./components/Pages/NotFoundPage";
import Summary from "./components/Pages/Summary";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoutes";
import Login from "./components/Pages/Login";
import ViewInvoicePage from "./components/Pages/ViewInvoicePage";
import ApiInvoiceTemplete from "./components/Pages/ApiInvoiceTemplete";
import Register from "./components/Pages/Register";

const RouteConfig = () => {
  const [role, setRole] = useState("ADMIN");
  console.log(role);

  useEffect(() => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    if (authTokens) {
      setRole(authTokens.user.authorities[0].authority);
    } else {
      setRole("");
    }
  }, [localStorage.getItem("authTokens")]);

  return (
    <Router>
      <AuthProvider>
        {console.log(role == "ADMIN")}
        <Routes>
          <Route path="/" exact element={<Login />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Main />
              </ProtectedRoute>
            }
          />
          {role == "ADMIN" && (
            <>
              <Route
                path="/invoices"
                element={
                  <ProtectedRoute>
                    <ViewInvoicePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/invoices/:id"
                element={
                  <ProtectedRoute>
                    <ApiInvoiceTemplete />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/summary"
                element={
                  <ProtectedRoute>
                    <Summary />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          <Route
            path="/product"
            element={
              <ProtectedRoute>
                <ViewProductList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <NotFoundPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default RouteConfig;
