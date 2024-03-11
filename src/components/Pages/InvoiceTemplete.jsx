import React, { useRef } from "react";
import Header from "../components/Header";
import MainDetails from "../components/MainDetails";
import ClientDetails from "../components/ClientDetails";
import Dates from "../components/Dates";
import Table from "../components/Table";
import Notes from "../components/Notes";
import Footer from "../components/Footer";
import ReactToPrint from "react-to-print";

const InvoiceTemplete = ({
  clientName,
  clientAddress,
  clientGst,
  clientPos,
  clientState,
  clientStateCode,
  invoiceNumber,
  invoiceDate,
  paymentType,
  invoiceDetails,
  list,
  totalDiscount,
  setList,
  sum,
  showInvoice,
  setShowInvoice,
  invoiceIdAfterDB,
}) => {
  const componentRef = useRef();
  return (
    <>
      <div ref={componentRef} className="p-5">
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
          invoiceNo={invoiceIdAfterDB}
          invoiceDate={invoiceDate}
          paymentMethod={paymentType}
        />
        <Table
          invoiceDetails={invoiceDetails}
          list={list}
          totalDiscount={totalDiscount}
          setList={setList}
          sum={sum}
        />
        <Notes />
      </div>
      <div className="flex justify-center gap-2 text-center">
        <ReactToPrint
          trigger={() => (
            <button className="mt-5 bg-blue-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300">
              Print/Download
            </button>
          )}
          content={() => componentRef.current}
        />
        <button
          onClick={() => setShowInvoice(false)}
          className="mt-5 bg-green-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300"
        >
          Edit Information
        </button>
      </div>
    </>
  );
};

export default InvoiceTemplete;
