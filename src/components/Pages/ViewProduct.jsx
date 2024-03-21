import React, { useState } from "react";
import BASE_URL from "../../services/urls";
import { MdDelete, MdEdit } from "react-icons/md";
import ConfirmationDialog from "../components/ConfirmationDialog ";
import { deleteData } from "../../api/api";

export const ViewProduct = ({
  filter,
  setFilter,
  filteredProducts,
  setFilteredProducts,
  handleViewProduct,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const handleDelete = (productId) => {
    setProductIdToDelete(productId);
    setShowConfirmation(true);
  };

  const handleConfirmDelete = async (productId) => {
    const response = deleteData(`${BASE_URL}/product/${productId}`);
  };

  return (
    <>
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
              <th colSpan="2" className="p-1">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product) => (
              <tr key={product.id} className="text-center">
                <td className="p-2">{product.id}</td>
                <td className="p-2">{product.productName}</td>
                <td className="p-2">
                  {Math.round(Math.ceil(product.productPrice))}
                </td>
                <td className="p-2" colSpan={2}>
                  <button onClick={() => handleViewProduct(product)}>
                    <MdEdit className="text-blue-600 font-bold text-xl" />
                  </button>
                </td>
                <td className="p-2" colSpan={2}>
                  <button onClick={() => handleDelete(product.id)}>
                    <MdDelete className="text-red-600 font-bold text-xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Dialog for deleting product */}
      {showConfirmation && (
        <ConfirmationDialog
          message="Are you sure you want to delete this product?"
          onCancel={() => setShowConfirmation(false)}
          onConfirm={() => {
            handleConfirmDelete(productIdToDelete);
            setShowConfirmation(false);
          }}
        />
      )}
    </>
  );
};

export default ViewProduct;
