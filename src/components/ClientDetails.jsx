import React from "react";

function ClientDetails({
  clientName,
  clientAddress,
  clientGst,
  clientPos,
  clientState,
  clientStateCode,
}) {
  return (
    <section className="mt-5">
      <article className="mt-5 flex items-start justify-start">
        <ul className="text-sm md:text-base">
          {" "}
          {/* Add this line */}
          <h2 className="text-xl uppercase">Client Details</h2>
          {clientName && (
            <li>
              <span className="font-bold">Name:</span> {clientName}
            </li>
          )}
          {clientAddress && (
            <li>
              <span className="font-bold">Address:</span> {clientAddress}
            </li>
          )}
          {clientGst && (
            <li>
              <span className="font-bold">GST:</span> {clientGst}
            </li>
          )}
          {clientPos && (
            <li>
              <span className="font-bold">POS:</span> {clientPos}
            </li>
          )}
          {clientState && (
            <li>
              <span className="font-bold">State:</span> {clientState}
            </li>
          )}
          {clientStateCode && (
            <li>
              <span className="font-bold">State Code:</span> {clientStateCode}
            </li>
          )}
        </ul>
      </article>
    </section>
  );
}

export default ClientDetails;
