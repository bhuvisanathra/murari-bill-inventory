import React, { useEffect, useState } from "react";
import SwitchButtons from "./SwitchButtons";
import { CiViewBoard } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const viewInvoicePage = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get("http://localhost:8081/invoices");
      setClients(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SwitchButtons />
      <div className=" flex flex-col justify-center m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
        <h3 className="font-bold text-2xl mt-3 mb-5 relative border-b-2">
          Selected Items
        </h3>
        <table className="mt-5 mb-5 w-full border-2">
          <thead>
            <tr className="bg-gray-100 p-2">
              <th className="p-1">No</th>
              <th className="p-1">Type</th>
              <th className="p-1">Client Name</th>
              <th className="p-1">Date</th>
              <th className="p-1">Amount</th>
              <th colSpan="2" className="p-1">
                View
              </th>
            </tr>
          </thead>
          <tbody>
            {clients?.map((client) => (
              <tr
                key={client.id}
                className="text-center"
                style={{ marginBottom: "5px" }}
              >
                <td className="p-1">{client.cd.id}</td>
                <td className="p-1">{client.id.paymentType}</td>
                <td className="p-1">{client.cd.clientName}</td>
                <td className="p-1">{client.cd.clientDate}</td>
                <td className="p-1">{client.id.grandTotal}</td>
                <td className="p-1">
                  <button onClick={() => navigate("/")}>
                    <CiViewBoard className="text-blue-600 font-bold text-xl" />
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

export default viewInvoicePage;
