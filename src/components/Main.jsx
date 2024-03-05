import { useState, useRef } from "react";
import Header from "./Header.jsx";
import MainDetails from "./MainDetails";
import ClientDetails from "./ClientDetails";
import Dates from "./Dates";
import Table from "./Table";
import Notes from "./Notes";
import Footer from "./Footer";
import TableForm from "./TableForm.jsx";
import ReactToPrint from "react-to-print";
import axios from "axios";

function Main() {
  const [paymentType, setPaymentType] = useState("Cash");
  const [showInvoice, setShowInvoice] = useState(true);
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [clientGst, setClientGst] = useState("");
  const [clientPos, setClientPos] = useState("");
  const [clientState, setClientState] = useState("");
  const [clientStateCode, setClientStateCode] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [list, setList] = useState([]);
  const [total, setTotal] = useState(0);

  const componentRef = useRef();

  // Table UseState
  const [invoiceDetails, setInvoiceDetails] = useState({
    srNo: "",
    productDetail: "",
    kgOrGram: "0",
    rate: "0",
    value: "0",
    disc: "0",
    afterDisc: "",
    total: "",
    totalDiscount: "",
    totalTaxableValue: "",
    precantageCgst: "2.50%",
    cgst: "",
    precantageSgst: "2.50%",
    sgst: "",
    shippingCharges: "",
    roundOff: "",
    grandTotal: "",
  });

  let totalValue = list.reduce((acc, item) => acc + parseFloat(item.value), 0);

  let sum = 0;
  list.forEach(({ afterDisc }) => {
    const afterDiscValue = parseFloat(afterDisc);
    if (!isNaN(afterDiscValue)) {
      sum += afterDiscValue;
    } else {
      console.error(`Invalid afterDisc value: ${afterDisc}`);
    }
  });
  let totalDiscount = list.reduce(
    (acc, item) => acc + parseFloat(item.disc),
    0
  );

  let totalAfterDiscount = list.reduce(
    (acc, item) => acc + parseFloat(item.afterDisc),
    0
  );

  let totalCgst = totalAfterDiscount * 0.025;
  let totalSgst = totalAfterDiscount * 0.025;

  let grandTotal =
    totalAfterDiscount +
    totalCgst +
    totalSgst +
    parseFloat(invoiceDetails.shippingCharges) +
    parseFloat(invoiceDetails.roundOff);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const viewObject = () => {
    const dataToSend = {
      clientDetails: {
        clientName: clientName,
        clientAddress: clientAddress,
        clientGst: clientGst,
        clientPos: clientPos,
        clientState: clientState,
        clientStateCode: clientStateCode,
      },
      paymentMethod: paymentType,
      invoiceDetails: {
        totalValue: totalValue,
        totalDiscount: totalDiscount,
        totalAfterDiscount: totalAfterDiscount,
        totalCgst: totalCgst,
        totalSgst: totalSgst,
        shippingCharges: invoiceDetails.shippingCharges,
        roundOff: invoiceDetails.roundOff,
        grandTotal: grandTotal,
      },
      invoiceList: list.map((item) => ({
        srNo: item.srNo,
        productDetail: item.productDetail,
        kgOrGram: item.kgOrGram,
        rate: item.rate,
        value: item.value,
        disc: item.disc,
        afterDisc: item.afterDisc,
      })),
    };

    console.log(dataToSend);

    axios
      .post("http://localhost:8081/invoices", dataToSend)
      .then((response) => {
        console.log("Data received:", response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the Axios request:", error);
      });
  };

  return (
    <>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl  bg-white rounded shadow">
        {showInvoice ? (
          <>
            <div ref={componentRef} className="p-5">
              <Header handlePrint={handlePrint} />
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
                invoiceNo={invoiceNumber}
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
              />
              <button
                onClick={() => setShowInvoice(false)}
                className="mt-5 bg-green-500 text-white font-bold py-2 px-4 rounded shadow border-2 border-green-500 hover:bg-transparent hover:text-green-500 transition-all duration-300"
              >
                Edit Information
              </button>
            </div>
          </>
        ) : (
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

              <label htmlFor="invoiceNo">{paymentType} No</label>
              <input
                type="no"
                name="text"
                id="invoiceNo"
                className="mb-3"
                placeholder={`${paymentType} No`}
                autoComplete="off"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
              />

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
        )}
      </main>
    </>
  );
}

export default Main;
