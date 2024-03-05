import React from "react";
import TableForm from "./TableForm";

const EditInvoicePage = ({
  clientName,
  setClientName,
  clientAddress,
  setClientAddress,
  clientGst,
  setClientGst,
  clientPos,
  setClientPos,
  clientState,
  setClientState,
  clientStateCode,
  setClientStateCode,
  invoiceNumber,
  invoiceDate,
  setInvoiceDate,
  paymentType,
  setPaymentType,
  invoiceDetails,
  setInvoiceDetails,
  list,
  setList,
  handleChange,
  sum,
  setShowInvoice,
  viewObject,
}) => {
  return (
    <>
      <div className="flex flex-col justify-center">
        <h2 className="font-bold text-3xl mb-5 border-b-2">
          Add Invoice Details
        </h2>

        <label htmlFor="paymentType">Payment Type</label>
        <select
          name="paymentType"
          id="paymentType"
          className="mb-3"
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
        >
          <option value="Cash">Cash</option>
          <option value="MFG Customer">MFG Customer</option>
        </select>

        {/* <label htmlFor="invoiceNo">{paymentType} No</label>
      <input
        type="no"
        name="text"
        id="invoiceNo"
        className="mb-3"
        placeholder={`${paymentType} No`}
        autoComplete="off"
        value={invoiceNumber}
        onChange={(e) => setInvoiceNumber(e.target.value)}
      /> */}

        {/* Div 1 For name and address */}
        <article className="md:grid grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              name="text"
              id="clientName"
              className="mb-3"
              placeholder="Enter Your Client Name"
              autoComplete="off"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address">Client Address</label>
            <input
              type="text"
              name="text"
              id="address"
              className="mb-3"
              placeholder="Enter address"
              autoComplete="off"
              value={clientAddress}
              onChange={(e) => setClientAddress(e.target.value)}
            />
          </div>
        </article>

        <article className="md:grid grid-cols-4 gap-10">
          <div className="flex flex-col">
            <label htmlFor="gst">Client GST</label>
            <input
              type="text"
              name="text"
              id="gst"
              className="mb-3"
              placeholder="Enter gst"
              autoComplete="off"
              value={clientGst}
              onChange={(e) => setClientGst(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="pos">Client POS</label>
            <input
              type="text"
              name="text"
              id="pos"
              className="mb-3"
              placeholder="Enter pos"
              autoComplete="off"
              value={clientPos}
              onChange={(e) => setClientPos(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="state">Client State</label>
            <input
              type="text"
              name="text"
              id="state"
              className="mb-3"
              placeholder="Enter State"
              autoComplete="off"
              value={clientState}
              onChange={(e) => setClientState(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="stateCode">Client State Code</label>
            <input
              type="text"
              name="text"
              id="stateCode"
              className="mb-3"
              placeholder="Enter State Code"
              autoComplete="off"
              value={clientStateCode}
              onChange={(e) => setClientStateCode(e.target.value)}
            />
          </div>
        </article>

        <label htmlFor="invoiceDate">Invoice Date</label>
        <input
          type="date"
          name="text"
          id="invoiceDate"
          className="mb-3"
          placeholder="Enter Invoice Date"
          autoComplete="off"
          value={invoiceDate}
          onChange={(e) => setInvoiceDate(e.target.value)}
        />

        {/* Table Form */}
        <TableForm
          invoiceDetails={invoiceDetails}
          setInvoiceDetails={setInvoiceDetails}
          list={list}
          setList={setList}
          handleChange={handleChange}
          sum={sum}
        />

        <article className="md:grid grid-cols-2 gap-10">
          <div className="flex flex-col">
            <label htmlFor="clientName">Shipping Charges</label>
            <input
              type="number"
              name="shippingCharges"
              id="shippingCharges"
              className="mb-3"
              placeholder="Shipping Charges"
              autoComplete="off"
              value={invoiceDetails.shippingCharges}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address">Round Off</label>
            <input
              type="number"
              name="roundOff"
              id="address"
              className="mb-3"
              placeholder="Enter address"
              autoComplete="off"
              value={invoiceDetails.roundOff}
              onChange={handleChange}
            />
          </div>
        </article>

        <button
          onClick={() => setShowInvoice(true)}
          className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
        >
          Preview Invoice
        </button>

        <button
          onClick={viewObject}
          className="mt-5 bg-blue-500 text-white font-bold py-1 px-1 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
        >
          View Object
        </button>
      </div>
    </>
  );
};

export default EditInvoicePage;