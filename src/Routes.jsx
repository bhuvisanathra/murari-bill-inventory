import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import ViewInvoicePage from "./components/ViewInvoicePage";
import ApiInvoiceTemplete from "./components/ApiInvoiceTemplete";
import ViewProductList from "./components/ViewProductList";

const RouteConfig = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/viewInvoice" element={<ViewInvoicePage />} />
        <Route path="/invoice/:id" element={<ApiInvoiceTemplete />} />
        <Route path="/viewProduct" element={<ViewProductList />} />
      </Routes>
    </Router>
  );
};

export default RouteConfig;
