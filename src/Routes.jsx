import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import ViewInvoicePage from "./components/Pages/ViewInvoicePage";
import ApiInvoiceTemplete from "./components/Pages/ApiInvoiceTemplete";
import ViewProductList from "./components/Pages/ViewProductList";
import NotFoundPage from "./components/Pages/NotFoundPage";

const RouteConfig = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/invoices" element={<ViewInvoicePage />} />
        <Route path="/invoices/:id" element={<ApiInvoiceTemplete />} />
        <Route path="/product" element={<ViewProductList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
