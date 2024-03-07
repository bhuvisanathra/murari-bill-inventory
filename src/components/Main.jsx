import { useState, useRef } from "react";
import axios from "axios";
import InvoiceTemplete from "./InvoiceTemplete.jsx";
import EditInvoicePage from "./EditInvoicePage.jsx";
import { useNavigate } from "react-router-dom";
import SwitchButtons from "./SwitchButtons.jsx";

function Main() {
  const [paymentType, setPaymentType] = useState("Cash");
  const [showInvoice, setShowInvoice] = useState(false);
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
    srNo: 0,
    productDetail: "",
    kgOrGram: 0,
    rate: 0,
    value: 0,
    disc: 0,
    afterDisc: 0,
    total: 0,
    totalDiscount: 0,
    totalTaxableValue: 0,
    precantageCgst: 2.5,
    cgst: 0,
    precantageSgst: 2.5,
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

  const viewObject = () => {
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
        shippingCharges: parseFloat(invoiceDetails.shippingCharges),
        roundOff: parseFloat(invoiceDetails.roundOff),
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

    console.log(dataToSend);

    // Sending data
    axios
      .post(
        "https://murari-bill-inventory-backend-production.up.railway.app/invoices",
        dataToSend
      )
      .then((response) => {
        console.log("Data received:", response.data);
      })
      .catch((error) => {
        console.error("There was a problem with the Axios request:", error);
      });
  };

  return (
    <>
      <SwitchButtons />

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
            componentRef={componentRef}
            showInvoice={showInvoice}
            setShowInvoice={setShowInvoice}
          />
        ) : (
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
          />
        )}
      </main>
    </>
  );
}

export default Main;
