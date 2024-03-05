import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import ViewInvoicePage from "./components/ViewInvoicePage";

const RouteConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/viewInvoice" element={<ViewInvoicePage />} />
        viewInvoice
      </Routes>
    </Router>
  );
};

export default RouteConfig;
