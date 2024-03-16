import React, { useEffect, useRef, useState } from "react";
import BASE_URL from "../../services/urls";
import { CiViewBoard } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { getData } from "../../api/api";
import Chart from "chart.js/auto"; // Import Chart.js

export const Summary = () => {
  const [clients, setClients] = useState([]);
  const [product, setProduct] = useState([]);
  const [sales, setSales] = useState([]);
  const [showCustomer, setShowCustomer] = useState(true);
  const [showProuct, setShowProduct] = useState(false);
  const [showSales, setShowSale] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);

  const navigate = useNavigate();
  const pieChartRef = useRef(null);
  const productPieChartRef = useRef(null);

  useEffect(() => {
    if (showSales && sales.length > 0) {
      // Extract data for the pie chart
      const paymentTypes = currentEntriesSales.map(
        (sales) => sales.paymentType
      );
      const clientCounts = currentEntriesSales.map(
        (sales) => sales.clientCount
      );

      // Prepare data for the pie chart
      const labels = paymentTypes;
      const data = clientCounts;

      // Get the canvas context
      const ctx = pieChartRef.current.getContext("2d");

      // Create the pie chart
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Client Count",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          // Additional chart options as needed
        },
      });
    }
  }, [showSales, sales]);

  useEffect(() => {
    if (showProuct && product.length > 0) {
      // Extract data for the pie chart
      const productNames = product.map((p) => p.productDetail);
      const productQuantities = product.map((p) => p.totalQuantity);

      // Prepare data for the pie chart
      const labels = productNames;
      const data = productQuantities;

      // Get the canvas context
      const ctx = productPieChartRef.current.getContext("2d");

      // Destroy existing chart if it exists
      if (productPieChartRef.current.chart) {
        productPieChartRef.current.chart.destroy();
      }

      // Create the pie chart
      productPieChartRef.current.chart = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Product Quantity",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.7)",
                "rgba(54, 162, 235, 0.7)",
                "rgba(255, 206, 86, 0.7)",
                "rgba(75, 192, 192, 0.7)",
                "rgba(153, 102, 255, 0.7)",
                "rgba(255, 159, 64, 0.7)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          // Additional chart options as needed
        },
      });
    }
  }, [showProuct, product]);

  const fetchCustomers = async () => {
    try {
      const response = await getData(`${BASE_URL}/user/analysis/client`);
      // console.log(response);
      setClients(response);
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await getData(`${BASE_URL}/user/analysis/product`);
      // console.log(response.data); // Ensure you're getting the correct data structure
      setProduct(response);
    } catch (error) {
      console.log("Error fetching customers:", error);
    }
  };

  const fetchSales = async () => {
    try {
      const response = await getData(`${BASE_URL}/user/analysis/sale`);
      // console.log(response.data); // Ensure you're getting the correct data structure
      setSales(response);
      // console.log(response.data);
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

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntriesClient = clients.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const currentEntriesProduct = product.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const currentEntriesSales = sales.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
                  <th className="p-1">Bill No</th>
                  <th className="p-2">Client Name</th>
                  <th className="p-2">Bill Amount</th>
                  <th className="p-1">Show Bill</th>
                </tr>
              </thead>
              <tbody>
                {currentEntriesClient
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
          <div className="flex justify-center">
            {Array.from(
              { length: Math.ceil(clients.length / entriesPerPage) },
              (_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`mx-1 p-2 border border-gray-300 rounded-md ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : ""
                  }`}
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </>
      )}

      {showProuct && (
        <>
          <div className="flex flex-row justify-center align-center mt-3 sm:flex flex-col">
            <div>
              <canvas
                ref={productPieChartRef}
                id="productPieChart"
                style={{ maxWidth: "100%", height: "auto" }}
              ></canvas>
            </div>
            <div>
              <h3 className="font-bold text-2xl mt-5 mb-5 relative border-b-2">
                Product Sale
              </h3>
              <div className="overflow-x-auto">
                <table className="mt-5 mb-5 w-full border-2">
                  <thead>
                    <tr className="bg-gray-100 p-2">
                      <th className="p-1">No</th>
                      <th className="p-2">Product Name</th>
                      <th className="p-2">Product Quantity</th>
                      <th className="p-2">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentEntriesProduct
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
              <div className="flex justify-center">
                {Array.from(
                  { length: Math.ceil(product.length / entriesPerPage) },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`mx-1 p-2 border border-gray-300 rounded-md ${
                        currentPage === index + 1
                          ? "bg-blue-500 text-white"
                          : ""
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        </>
      )}

      {showSales && (
        <>
          <div className="flex flex-row justify-center align-center mt-3 sm:flex flex-col">
            <div>
              <canvas
                ref={pieChartRef}
                id="pieChart"
                style={{ maxWidth: "100%", height: "auto" }}
              ></canvas>
            </div>
            <div>
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
                    {currentEntriesSales
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
            </div>
          </div>
        </>
      )}
    </>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li key={number} className="page-item">
            <button onClick={() => paginate(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Summary;
