import React from "react";
import BASE_URL from "../services/urls";
import { MdEdit } from "react-icons/md";
import { ProductEditDialog } from "./ProductEditDialog";

export const ViewProduct = ({
  filter,
  setFilter,
  filteredProducts,
  handleViewProduct,
}) => {
  return (
    <>
      <h3 className="font-bold text-2xl mt-3 mb-5 relative border-b-2">
        Products
      </h3>

      {/* Filter input field */}
      <input
        type="text"
        placeholder="Search Product"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-3 p-2 border rounded"
      />
      <div className="overflow-x-auto">
        <table className="mt-5 mb-5 w-full border-2">
          <thead>
            <tr className="bg-gray-100 p-2">
              <th className="p-2">No</th>
              <th className="p-2">Product Name</th>
              <th className="p-2">Product Price</th>
              <th colSpan="2" className="p-1">
                Edit Price
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="p-2">{product.id}</td>
                <td className="p-2">{product.productName}</td>
                <td className="p-2">{product.productPrice}</td>
                <td className="p-2">
                  <button onClick={() => handleViewProduct(product)}>
                    <MdEdit className="text-blue-600 font-bold text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewProduct;
