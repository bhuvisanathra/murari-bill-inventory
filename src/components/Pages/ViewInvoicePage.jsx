import React, { useEffect, useState } from "react";
import SwitchButtons from "../components/SwitchButtons";
import { CiViewBoard } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import BASE_URL from "../../services/urls";
import ConfirmationDialog from "../components/ConfirmationDialog ";

const ViewInvoicePage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(20);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/invoices`);
      setClients(response.data);
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
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleDelete = (clientId) => {
    setSelectedInvoiceId(clientId);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/invoices/${selectedInvoiceId}`);
      fetchClients();
    } catch (error) {
      console.error("Error deleting invoice:", error);
    } finally {
      setShowConfirmation(false);
    }
  };

  const filteredClients = clients.filter((client) =>
    client.cd.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredClients.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <SwitchButtons />
      <div className="flex bg-white flex-col justify-center m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
        <h3 className="font-bold text-2xl mt-3 mb-5 relative border-b-2">
          Selected Items
        </h3>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by client name"
          className="mb-3 p-2 border border-gray-300 rounded-md"
        />
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
                  <td className="p-2">{client.id.grandTotal}</td>
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
            { length: Math.ceil(filteredClients.length / entriesPerPage) },
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
