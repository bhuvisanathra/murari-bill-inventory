import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import ViewInvoicePage from "./components/Pages/ViewInvoicePage";
import ApiInvoiceTemplete from "./components/Pages/ApiInvoiceTemplete";
import ViewProductList from "./components/Pages/ViewProductList";
import NotFoundPage from "./components/Pages/NotFoundPage";

const RouteConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/viewInvoice" element={<ViewInvoicePage />} />
        <Route path="/invoice/:id" element={<ApiInvoiceTemplete />} />
        <Route path="/viewProduct" element={<ViewProductList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
