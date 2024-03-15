import React, { useEffect, useState } from "react";
import BASE_URL from "../../services/urls";
import axios from "axios";
import { CiViewBoard } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

export const Summary = () => {
  const [clients, setClients] = useState([]);
  const [product, setProduct] = useState([]);
  const [sales, setSales] = useState([]);
  const [showCustomer, setShowCustomer] = useState(true);
  const [showProuct, setShowProduct] = useState(false);
  const [showSales, setShowSale] = useState(false);
  const navigate = useNavigate();

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/analysis/client`);
      // console.log(response.data); // Ensure you're getting the correct data structure
      setClients(response.data);
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/analysis/product`);
      // console.log(response.data); // Ensure you're getting the correct data structure
      setProduct(response.data);
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/analysis/sale`);
      // console.log(response.data); // Ensure you're getting the correct data structure
      setSales(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  useEffect(() => {
    fetchCustomers();
    fetchProduct();
    fetchSales();
  }, []);

  const handleViewInvoice = (clientId) => {
    const selectedClient = clients.find((client) => client.cd.id === clientId);
    navigate(`/invoices/${clientId}`, {
      state: { clientData: selectedClient },
    });
  };

  return (
    <>
      <div className="flex justify-center md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl  ">
        <button
          className={
            "p-2 rounded shadow flex-grow bg-blue-500 text-white font-bold py-2 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 mr-2 bg-blue-500"
          }
          onClick={() => {
            setShowCustomer(true);
            setShowProduct(false);
            setShowSale(false);
          }}
        >
          Customer Report
        </button>
        <button
          className={
            "p-2 rounded shadow flex-grow bg-blue-500 text-white font-bold py-2 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 mr-2 bg-blue-500"
          }
          onClick={() => {
            setShowCustomer(false);
            setShowProduct(true);
            setShowSale(false);
          }}
        >
          Product Report
        </button>
        <button
          className={
            "p-2 rounded shadow flex-grow bg-blue-500 text-white font-bold py-2 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300 mr-2 bg-blue-500"
          }
          onClick={() => {
            setShowCustomer(false);
            setShowProduct(false);
            setShowSale(true);
          }}
        >
          Sales Report
        </button>
      </div>

      {showCustomer && (
        <>
          <h3 className="font-bold text-2xl mt-5 mb-5 relative border-b-2">
            Highest Bill Amount
          </h3>
          <div className="overflow-x-auto">
            <table className="mt-5 mb-5 w-full border-2">
              <thead>
                <tr className="bg-gray-100 p-2">
                  <th className="p-2">Bill No</th>
                  <th className="p-2">Client Name</th>
                  <th className="p-2">Bill Amount</th>
                  <th className="p-2">Show Bill</th>
                </tr>
              </thead>
              <tbody>
                {clients
                  .slice()
                  .sort((a, b) => b.id.grandTotal - a.id.grandTotal)
                  .map((client, index) => (
                    <tr
                      key={index}
                      className="text-center"
                      style={{ marginBottom: "5px" }}
                    >
                      {/* <td className="p-2">{index + 1}</td> */}
                      <td className="p-2">{client.cd.id}</td>
                      <td className="p-2">{client.cd.clientName}</td>
                      <td className="p-2">
                        {Math.round(client.id.grandTotal)}
                      </td>
                      <td colSpan="2" className="p-2">
                        <button onClick={() => handleViewInvoice(client.cd.id)}>
                          <CiViewBoard className="text-blue-600 font-bold text-xl" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showProuct && (
        <>
          <h3 className="font-bold text-2xl mt-5 mb-5 relative border-b-2">
            Product Sale
          </h3>
          <div className="overflow-x-auto">
            <table className="mt-5 mb-5 w-full border-2">
              <thead>
                <tr className="bg-gray-100 p-2">
                  <th className="p-2">No</th>
                  <th className="p-2">Product Name</th>
                  <th className="p-2">Product Quantity</th>
                  <th className="p-2">Total Price</th>
                </tr>
              </thead>
              <tbody>
                {product
                  .slice()
                  .sort((a, b) => b.totalQuantity - a.totalQuantity) // Sort products by total quantity
                  .map((product, index) => (
                    <tr
                      key={index}
                      className="text-center"
                      style={{ marginBottom: "5px" }}
                    >
                      {/* <td className="p-2">{index + 1}</td> */}
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{product.productDetail}</td>
                      <td className="p-2">{product.totalQuantity}</td>
                      <td className="p-2">{product.totalValue}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showSales && (
        <>
          <h3 className="font-bold text-2xl mt-5 mb-5 relative border-b-2">
            Sales Report
          </h3>
          <div className="overflow-x-auto">
            <table className="mt-5 mb-5 w-full border-2">
              <thead>
                <tr className="bg-gray-100 p-2">
                  <th className="p-2">No</th>
                  <th className="p-2">Total Bills</th>
                  <th className="p-2">Payment Method</th>
                  <th className="p-2">Total Value</th>
                </tr>
              </thead>
              <tbody>
                {sales
                  .slice()
                  .sort((a, b) => b.totalGrandTotal - a.totalGrandTotal) // Sort sales by total grand total
                  .map((sales, index) => (
                    <tr
                      key={index}
                      className="text-center"
                      style={{ marginBottom: "5px" }}
                    >
                      <td className="p-2">{index + 1}</td>
                      {/* <td className="p-2">{client.cd.id}</td> */}
                      <td className="p-2">{sales.clientCount}</td>
                      <td className="p-2">{sales.paymentType}</td>
                      <td className="p-2">
                        {Math.round(sales.totalGrandTotal)}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  );
};

export default Summary;
