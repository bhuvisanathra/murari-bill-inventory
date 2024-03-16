import React, { useEffect, useState } from "react";
import SwitchButtons from "../components/SwitchButtons";
import { CiViewBoard } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import BASE_URL from "../../services/urls";
import ConfirmationDialog from "../components/ConfirmationDialog ";
import { deleteData, getData } from "../../api/api";

const ViewInvoicePage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(20);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [sortByDate, setSortByDate] = useState("");
  const [sortByPaymentType, setSortByPaymentType] = useState("");

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getData(`${BASE_URL}/user/invoices`);
      setClients(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewInvoice = (clientId) => {
    const selectedClient = clients.find((client) => client.cd.id === clientId);
    navigate(`/invoices/${clientId}`, {
      state: { clientData: selectedClient },
    });
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    if (query === "") {
      fetchClients(); // Fetch clients again to reset the list
    } else {
      const filteredClients = clients.filter((client) =>
        client.cd.clientName.toLowerCase().includes(query)
      );
      setClients(filteredClients);
    }
  };

  const handleDelete = (clientId) => {
    setSelectedInvoiceId(clientId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteData(`${BASE_URL}/user/invoices/${selectedInvoiceId}`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting invoice:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const handleSortByDate = (value) => {
    setSortByDate(value);
    sortClientsByDate(value);
  };

  const handleSortByPaymentType = (value) => {
    setSortByPaymentType(value);
    sortClientsByPaymentType(value);
  };

  const sortClientsByDate = (sortByDate) => {
    const sortedClients = [...clients].sort((a, b) => {
      const dateA = new Date(a.cd.clientDate);
      const dateB = new Date(b.cd.clientDate);
      switch (sortByDate) {
        case "day":
          return dateA.getDate() - dateB.getDate();
        case "month":
          return dateA.getMonth() - dateB.getMonth();
        case "year":
          return dateA.getFullYear() - dateB.getFullYear();
        default:
          return 0;
      }
    });
    setClients(sortedClients);
  };

  const sortClientsByPaymentType = (sortByPaymentType) => {
    const sortedClients = [...clients].sort((a, b) => {
      switch (sortByPaymentType) {
        case "cash":
          return a.id.paymentType.localeCompare(b.id.paymentType);
        case "MFG Customer":
          // Assuming MFG Customer is a specific payment type
          return a.id.paymentType === "MFG Customer" ? -1 : 1;
        default:
          return 0;
      }
    });
    setClients(sortedClients);
  };

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = clients.slice(indexOfFirstEntry, indexOfLastEntry);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <SwitchButtons />
      <div className="flex bg-white flex-col justify-center m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
        <h3 className="font-bold text-2xl mt-3 mb-5 relative border-b-2">
          Selected Items
        </h3>
        <div className="flex flex-wrap items-center mb-3">
          {/* Full width input box */}
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by client name"
            style={{
              width: "100%", // Full width for mobile devices
              marginBottom: "8px", // Add some margin at the bottom
            }}
            className="p-2 border border-gray-300 rounded-md mr-2"
          />
          {/* Two dropdowns sharing width */}
          <div className="flex flex-wrap items-center w-full">
            <select
              value={sortByDate}
              onChange={(e) => handleSortByDate(e.target.value)}
              className="p-2 border border-gray-300 rounded-md mr-2"
              style={{ flex: "1", marginRight: "8px" }} // Each dropdown takes half width on mobile
            >
              <option value="">Sort</option>
              <option value="day">Day</option>
              <option value="month">Month</option>
              <option value="year">Year</option>
            </select>
            {/* Dropdown for sorting by payment type */}
            <select
              value={sortByPaymentType}
              onChange={(e) => handleSortByPaymentType(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
              style={{ flex: "1" }} // Each dropdown takes half width on mobile
            >
              <option value="">Type</option>
              <option value="cash">Cash</option>
              <option value="MFG Customer">MFG Cust</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="mt-5 mb-5 w-full border-2">
            <thead>
              <tr className="bg-gray-100 p-2">
                <th className="p-2">No</th>
                <th className="p-2">Type</th>
                <th className="p-2">Client Name</th>
                <th className="p-2">Date</th>
                <th className="p-2">Amount</th>
                <th colSpan="2" className="p-1">
                  View
                </th>
                <th colSpan="2" className="p-1">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {currentEntries.map((client) => (
                <tr
                  key={client.cd.id}
                  className="text-center"
                  style={{ marginBottom: "5px" }}
                >
                  <td className="p-2">{client.cd.id}</td>
                  <td className="p-2">{client.id.paymentType}</td>
                  <td className="p-2">{client.cd.clientName}</td>
                  <td className="p-2">{client.cd.clientDate}</td>
                  <td className="p-2">
                    {Math.round(Math.ceil(client.id.grandTotal))}
                  </td>
                  <td colSpan="2" className="p-2">
                    <button onClick={() => handleViewInvoice(client.cd.id)}>
                      <CiViewBoard className="text-blue-600 font-bold text-xl" />
                    </button>
                  </td>
                  <td colSpan="2" className="p-2">
                    <button onClick={() => handleDelete(client.cd.id)}>
                      <MdDelete className="text-red-600 font-bold text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
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
        {/* Confirmation Dialog */}
        {showConfirmation && (
          <ConfirmationDialog
            message="Are you sure you want to delete this invoice?"
            onCancel={() => setShowConfirmation(false)}
            onConfirm={confirmDelete}
          />
        )}
      </div>
    </>
  );
};

export default ViewInvoicePage;
