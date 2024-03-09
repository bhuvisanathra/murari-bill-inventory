import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import MainDetails from "../components/MainDetails";
import ClientDetails from "../components/ClientDetails";
import Dates from "../components/Dates";
import Tablee from "../components/ApiTable";
import Notes from "../components/Notes";
import Footer from "../components/Footer";
import ReactToPrint from "react-to-print";
import axios from "axios";
import SwitchButtons from "../components/SwitchButtons";
import BASE_URL from "../../services/urls";
import Loading from "./Loading";

const InvoiceeTemplate = () => {
  const { id } = useParams();
  const [clientData, setClientData] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/invoices/${id}`);
        setClientData(response.data);
        // console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchClientData();
  }, [id]);

  if (!clientData) return <Loading />;

  const {
    clientName,
    clientAddress,
    clientGst,
    clientPos,
    clientState,
    clientStateCode,
    clientDate,
  } = clientData.cd;

  const { paymentType } = clientData.id;

  const invoiceDetails = {
    shippingCharges: clientData.id.shippingCharges,
    roundOff: clientData.id.roundOff,
    totalValue: clientData.id.totalValue,
    totalDiscount: clientData.id.totalDiscount,
    totalCgst: clientData.id.totalCgst,
    totalSgst: clientData.id.totalSgst,
    grandTotal: clientData.id.grandTotal,
    discount: clientData.id.discount,
  };

  return (
    <>
      <SwitchButtons />
      <div className="flex bg-white flex-col justify-center m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
        <div ref={componentRef} className="p-5" id="invoice-template">
          <Header />
          <MainDetails />
          <ClientDetails
            clientName={clientName}
            clientAddress={clientAddress}
            clientGst={clientGst}
            clientPos={clientPos}
            clientState={clientState}
            clientStateCode={clientStateCode}
          />
          <Dates
            invoiceNo={id}
            invoiceDate={clientDate}
            paymentMethod={paymentType}
          />
          <Tablee invoiceDetails={invoiceDetails} list={clientData.il} />
          <Notes />
          <Footer />
        </div>
        <div className="flex justify-center gap-2 text-center">
          <ReactToPrint
            trigger={() => (
              <button className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
                Print/Download
              </button>
            )}
            content={() => componentRef.current}
            bodyClass="print-container" // Add this to apply custom styling for printing
          />
        </div>
      </div>
    </>
  );
};

export default InvoiceeTemplate;
