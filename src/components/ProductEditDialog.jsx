import React from "react";

export const ProductEditDialog = ({
  setSelectedProduct,
  selectedProduct,
  handleCloseDialog,
  handleUpdateProduct,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Update Product</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="productName" className="block font-semibold mb-2">
              Product Name:
            </label>
            <input
              type="text"
              id="productName"
              value={selectedProduct.productName}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  productName: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="productPrice" className="block font-semibold mb-2">
              Product Price:
            </label>
            <input
              type="number"
              id="productPrice"
              value={selectedProduct.productPrice}
              onChange={(e) =>
                setSelectedProduct({
                  ...selectedProduct,
                  productPrice: e.target.value,
                })
              }
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="text-right">
            <button
              type="button"
              onClick={handleCloseDialog}
              className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdateProduct}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
