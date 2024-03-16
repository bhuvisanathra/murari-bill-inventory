import React, { useEffect, useState } from "react";
import SwitchButtons from "../components/SwitchButtons";
import BASE_URL from "../../services/urls";
import { ProductEditDialog } from "../components/ProductEditDialog";
import ViewProduct from "./ViewProduct";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import { deleteData, getData, postData, putData } from "../../api/api";

const ViewProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filter, setFilter] = useState("");
  const navigate = useNavigate();
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await getData(`${BASE_URL}/user/product`);
      setProducts(response);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDialog = () => {
    setSelectedProduct(null);
  };

  const handleUpdateProduct = () => {
    if (selectedProduct) {
      putData(`${BASE_URL}/user/product`, selectedProduct)
        .then((response) => {
          console.log("Product updated");
          fetchProducts();
          setSelectedProduct(null);
        })
        .catch((error) => {
          console.error("Error updating product:", error);
        });
    }
  };

  const handleAddProduct = async (newProduct) => {
    const { productName, productPrice } = newProduct;

    if (!productName || !productPrice) {
      setShowDialog(true);
    } else {
      try {
        await postData(`${BASE_URL}/user/product`, newProduct);
        fetchProducts();
        setAddProduct(false);
        setIsAddingProduct(false); // Redirect to view product screen after adding
        navigate("/product");
      } catch (error) {
        console.error("Error adding product:", error);
      }
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteData(`${BASE_URL}/user/product/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products?.filter((product) =>
    product.productName.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      {showDialog && (
        <Dialog showDialog={showDialog} setShowDialog={setShowDialog} />
      )}
      <SwitchButtons />
      <div className="flex bg-white flex-col justify-center m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
        {/* Buttons */}
        <div className="flex justify-center md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl  ">
          <button
            className={`p-2 rounded shadow flex-grow bg-blue-500 text-white font-bold py-2 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 mr-2 ${
              !isAddingProduct ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => {
              setIsAddingProduct(false);
              setAddProduct(false);
            }}
          >
            View Product
          </button>
          <button
            className={`p-2 rounded shadow flex-grow bg-blue-500 text-white font-bold py-2 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 ml-2 ${
              isAddingProduct ? "bg-blue-500" : "bg-gray-500"
            }`}
            onClick={() => setIsAddingProduct(true)}
          >
            Add Product
          </button>
        </div>

        {/* Add product form */}
        {isAddingProduct && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const productName = e.target.elements.productName.value;
              const productPrice = e.target.elements.productPrice.value;
              handleAddProduct({ productName, productPrice });
            }}
            className="flex flex-col items-center mt-5"
          >
            <input
              type="text"
              name="productName"
              placeholder="Product Name"
              className="mb-3 p-2 border rounded"
            />
            <input
              type="number"
              name="productPrice"
              placeholder="Product Price"
              className="mb-3 p-2 border rounded"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
            >
              Add Product
            </button>
          </form>
        )}

        {/* View product list */}
        {!isAddingProduct && (
          <ViewProduct
            filter={filter}
            setFilter={setFilter}
            filteredProducts={filteredProducts}
            setFilteredProducts={setProducts} // pass setProducts instead of setFilteredProducts
            handleViewProduct={handleViewProduct}
            handleDeleteProduct={handleDeleteProduct} // pass handleDeleteProduct
          />
        )}
      </div>

      {/* Dialog box for updating product */}
      {selectedProduct && (
        <ProductEditDialog
          selectedProduct={selectedProduct}
          setSelectedProduct={setSelectedProduct}
          handleCloseDialog={handleCloseDialog}
          handleUpdateProduct={handleUpdateProduct}
          handleViewProduct={handleViewProduct}
        />
      )}
    </>
  );
};

export default ViewProductList;
