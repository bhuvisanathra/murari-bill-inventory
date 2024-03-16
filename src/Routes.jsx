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

const RouteConfig = () => {
  const [role, setRole] = useState("");

  useEffect(() => {
    const authTokens = JSON.parse(localStorage.getItem("authTokens"));
    if (authTokens && authTokens.user && authTokens.user.authorities) {
      setRole(authTokens.user.authorities[0].authority);
    } else {
      setRole("");
    }
  }, []);

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/sign-in" exact element={<Login />} />
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
