import React from "react";

function Dates({ invoiceNo, invoiceDate, paymentMethod }) {
  return (
    <article className="mt-5 flex items-end justify-end">
      <ul>
        <li className="p-1">
          <span className="font-bold">{paymentMethod} Number:</span> {invoiceNo}
        </li>
        <li className="p-1 bg-gray-100 rounded">
          <span className="font-bold">Invoice date:</span> {invoiceDate}
        </li>
      </ul>
    </article>
  );
}

export default Dates;
