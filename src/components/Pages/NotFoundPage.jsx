import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container mx-auto text-center mt-20">
      <h1 className="text-5xl font-bold mb-5">404</h1>
      <p className="text-gray-600">Oops! Page not found.</p>
      <Link to="/home" className="text-blue-500 hover:underline mt-3 block">
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
