import React from "react";

function Dates({ invoiceNo, invoiceDate, paymentMethod }) {
  return (
    <article className="flex items-end justify-end ">
      <ul>
        <h2 className="text-xl uppercase mb-0.5 border-b-2 border-gray-300 md:2xl sm:text-xl">
          Invoice Details
        </h2>
        <p className="text-left md:text-left " style={{ fontSize: "16px" }}>
          <span className="font-bold">{paymentMethod} Number:</span> {invoiceNo}
        </p>{" "}
        <p className="text-left md:text-left " style={{ fontSize: "16px" }}>
          <span className="font-bold">Invoice date:</span> {invoiceDate}
        </p>{" "}
      </ul>
    </article>
  );
}

export default Dates;
