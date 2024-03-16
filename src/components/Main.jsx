import { useState, useRef } from "react";
import InvoiceTemplete from "./Pages/InvoiceTemplete.jsx";
import EditInvoicePage from "../components/Pages/EditInvoicePage.jsx";
import SwitchButtons from "./components/SwitchButtons.jsx";
import BASE_URL from "../services/urls.js";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postData, putData } from "../api/api.jsx";

function Main() {
  const currentDate = new Date().toISOString().split("T")[0];
  const [paymentType, setPaymentType] = useState("Cash");
  const [showInvoice, setShowInvoice] = useState(false);
  const [clientName, setClientName] = useState(" ");
  const [clientAddress, setClientAddress] = useState(" ");
  const [invoiceNumber, setInvoiceNumber] = useState(" ");
  const [clientGst, setClientGst] = useState(" ");
  const [clientPos, setClientPos] = useState(" ");
  const [clientState, setClientState] = useState("Gujarat");
  const [clientStateCode, setClientStateCode] = useState("24");
  const [invoiceDate, setInvoiceDate] = useState(currentDate);
  const [list, setList] = useState([]);
  const [invoiceIdAfterDB, setInvoiceIdAfterDB] = useState(null);
  const [invoiceListIds, setInvoiceListIds] = useState([]);
  const [total, setTotal] = useState(0);

  // Table UseState
  const [invoiceDetails, setInvoiceDetails] = useState({
    srNo: 0,
    productDetail: " ",
    kgOrGram: 1,
    rate: 0,
    value: 0,
    disc: 0,
    afterDisc: 0,
    total: 0,
    totalDiscount: 0,
    totalTaxableValue: 0,
    precantageCgst: "2.5",
    cgst: 0,
    precantageSgst: "2.5",
    sgst: 0,
    shippingCharges: 0,
    roundOff: 0,
    grandTotal: 0,
  });

  let totalValue = list.reduce((acc, item) => acc + parseFloat(item.value), 0);

  // Total Discount Function
  let sum = 0;
  list.forEach(({ afterDisc }) => {
    const afterDiscValue = parseFloat(afterDisc);
    if (!isNaN(afterDiscValue)) {
      sum += afterDiscValue;
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

  let shippingCharges = parseFloat(invoiceDetails.shippingCharges) || 0;
  let roundOff = parseFloat(invoiceDetails.roundOff) || 0;

  let grandTotal =
    totalAfterDiscount + totalCgst + totalSgst + shippingCharges + roundOff;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInvoiceDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const viewObject = async () => {
    if (!clientName || !clientAddress || !clientState || list.length === 0) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (invoiceIdAfterDB !== null) {
      const dataToSend = {
        clientDetails: {
          id: invoiceIdAfterDB,
          clientName: clientName,
          clientAddress: clientAddress,
          clientGst: clientGst,
          clientPos: clientPos,
          clientState: clientState,
          clientStateCode: clientStateCode,
          invoiceDate: invoiceDate,
        },
        invoiceDetails: {
          id: invoiceIdAfterDB,
          paymentType: paymentType,
          totalValue: parseFloat(totalValue),
          totalDiscount: parseFloat(totalDiscount),
          totalAfterDiscount: parseFloat(totalAfterDiscount),
          totalCgst: parseFloat(totalCgst),
          totalSgst: parseFloat(totalSgst),
          shippingCharges: parseFloat(shippingCharges),
          roundOff: parseFloat(roundOff),
          grandTotal: parseFloat(grandTotal),
        },
        invoiceList: list.map((item, index) => ({
          id: invoiceIdAfterDB,
          srNo: parseFloat(item.srNo),
          productDetail: item.productDetail,
          kgOrGram: parseFloat(item.kgOrGram),
          rate: parseFloat(item.rate),
          value: parseFloat(item.value),
          disc: parseFloat(item.disc),
          afterDisc: parseFloat(item.afterDisc),
        })),
      };

      console.log(`\n${dataToSend} of the Bill\n`);
      const response = await putData(
        `${BASE_URL}/user/invoices/${invoiceIdAfterDB}`,
        dataToSend
      );
      console.log("Data updated:", response);
      // console.log(dataToSend);
      setShowInvoice(true);
      toast.success("Invoice updated!");
    } else {
      const dataToSend = {
        clientDetails: {
          clientName: clientName,
          clientAddress: clientAddress,
          clientGst: clientGst,
          clientPos: clientPos,
          clientState: clientState,
          clientStateCode: clientStateCode,
          invoiceDate: invoiceDate,
        },
        invoiceDetails: {
          paymentType: paymentType,
          totalValue: parseFloat(totalValue),
          totalDiscount: parseFloat(totalDiscount),
          totalAfterDiscount: parseFloat(totalAfterDiscount),
          totalCgst: parseFloat(totalCgst),
          totalSgst: parseFloat(totalSgst),
          shippingCharges: parseFloat(shippingCharges),
          roundOff: parseFloat(roundOff),
          grandTotal: parseFloat(grandTotal),
        },
        invoiceList: list.map((item) => ({
          srNo: parseInt(item.srNo),
          productDetail: item.productDetail,
          kgOrGram: parseFloat(item.kgOrGram),
          rate: parseFloat(item.rate),
          value: parseFloat(item.value),
          disc: parseFloat(item.disc),
          afterDisc: parseFloat(item.afterDisc),
        })),
      };
      const response = await postData(`${BASE_URL}/user/invoices`, dataToSend);
      // console.log("Data received:", response);
      setInvoiceIdAfterDB(response.invoiceIdAfterDB);
      setInvoiceListIds(response.invoiceDetailsIdAfterDB);
      setShowInvoice(true);
      toast.success("Bill Generated!");
    }
  };

  return (
    <>
      <SwitchButtons />
      <ToastContainer
        position="top-right"
        className="min-w-fit"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <main className="m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl  bg-white rounded shadow">
        {showInvoice ? (
          <InvoiceTemplete
            clientName={clientName}
            clientAddress={clientAddress}
            clientGst={clientGst}
            clientPos={clientPos}
            clientState={clientState}
            clientStateCode={clientStateCode}
            invoiceNo={invoiceNumber}
            invoiceDate={invoiceDate}
            paymentMethod={paymentType}
            invoiceDetails={invoiceDetails}
            list={list}
            totalDiscount={totalDiscount}
            setList={setList}
            sum={sum}
            showInvoice={showInvoice}
            setShowInvoice={setShowInvoice}
            invoiceIdAfterDB={invoiceIdAfterDB}
            setInvoiceIdAfterDB={setInvoiceIdAfterDB}
          />
        ) : (
          <>
            <EditInvoicePage
              clientName={clientName}
              setClientName={setClientName}
              clientAddress={clientAddress}
              setClientAddress={setClientAddress}
              clientGst={clientGst}
              setClientGst={setClientGst}
              clientPos={clientPos}
              setClientPos={setClientPos}
              clientState={clientState}
              setClientState={setClientState}
              clientStateCode={clientStateCode}
              setClientStateCode={setClientStateCode}
              invoiceNo={invoiceNumber}
              invoiceDate={invoiceDate}
              setInvoiceDate={setInvoiceDate}
              paymentType={paymentType}
              setPaymentType={setPaymentType}
              invoiceDetails={invoiceDetails}
              setInvoiceDetails={setInvoiceDetails}
              list={list}
              setList={setList}
              handleChange={handleChange}
              sum={sum}
              showInvoice={showInvoice}
              setShowInvoice={setShowInvoice}
              viewObject={viewObject}
              invoiceIdAfterDB={invoiceIdAfterDB}
              setInvoiceIdAfterDB={setInvoiceIdAfterDB}
            />
          </>
        )}
      </main>
    </>
  );
}

export default Main;
