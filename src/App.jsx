import { useState } from "react";
import Header from "./components/Header.jsx";
import MainDetails from "./components/MainDetails";
import ClientDetails from "./components/ClientDetails";
import Dates from "./components/Dates";
import Table from "./components/Table";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import TableForm from "./components/TableForm.jsx";

function App() {
  const [paymentType, setPaymentType] = useState("Cash");
  const [showInvoice, setShowInvoice] = useState(true);
  const [clientName, setClientName] = useState("Bhuvnesh Sanathra");
  const [clientAddress, setClientAddress] = useState(
    "Acc Road Chayya Porbandar"
  );
  const [invoiceNumber, setInvoiceNumber] = useState("1");
  const [clientGst, setClientGst] = useState("");
  const [clientPos, setClientPos] = useState("");
  const [clientState, setClientState] = useState("Gujarat");
  const [clientStateCode, setClientStateCode] = useState("GJ-25");
  const [invoiceDate, setInvoiceDate] = useState("02/10/2003");

  // Table UseState
  const [invoiceDetails, setInvoiceDetails] = useState({
    srNo: "1",
    productDetail: "Kachori",
    kgOrGram: "2",
    rate: "240",
    value: "480",
    disc: "0",
    afterDisc: "480",
    total: "480",
    totalDiscount: "0",
    totalTaxableValue: "480",
    precantageCgst: "2.50%",
    cgst: "6",
    precantageSgst: "2.50%",
    sgst: "6",
    shippingCharges: "0",
    roundOff: "0",
    grandTotal: "502",
  });

  // Handle change for invoice Details
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

  return (
    <>
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl  bg-white rounded shadow">
        {showInvoice ? (
          <div>
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
            <Dates invoiceNo={invoiceNumber} invoiceDate={invoiceDate} />
            <Table invoiceDetails={invoiceDetails} />
            <Notes />
            <Footer />
            <div className="flex justify-center">
              <button
                onClick={() => setShowInvoice(false)}
                className="mt-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
              >
                Edit Information
              </button>
            </div>
          </div>
        ) : (
          <>
            {/*Invoice Number, Client Name, Address, State, POS, Customer GST, Date, Product Details(Name, KG, Rate, Discount) */}
            {/* Name, Address, email, phone, bank name, bank account number, website, client name, client address, invoice number, incouce date, notes */}
            <div className="flex flex-col justify-center">
              <h2 className="font-bold text-3xl mb-5">Add Invoice Details</h2>

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
                handleChange={handleChange}
              />

              <button
                onClick={() => setShowInvoice(true)}
                className="bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
              >
                Preview Invoice
              </button>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export default App;
