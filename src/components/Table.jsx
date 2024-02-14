import React from "react";

function Table({ invoiceDetails }) {
  return (
    <>
      <table width="100%" className="mt-5">
        <thead>
          {/* <tr>
            <th>Product Description</th>
          </tr> */}
          <tr className="bg-gray-100">
            <th>Sr No</th>
            <th>Product Details</th>
            <th>KM/GM</th>
            <th>Rate</th>
            <th>Value</th>
            <th>Discount</th>
            <th>After Discount</th>
          </tr>
        </thead>

        {/* Changable Data */}
        <tbody>
          <tr className="text-center">
            <td>{invoiceDetails.srNo}</td>
            <td>{invoiceDetails.productDetail}</td>
            <td>{invoiceDetails.kgOrGram}</td>
            <td>{invoiceDetails.rate}</td>
            <td>{invoiceDetails.kgOrGram * invoiceDetails.rate}</td>
            <td>{invoiceDetails.disc}</td>
            <td>
              {parseFloat(invoiceDetails.kgOrGram) *
                parseFloat(invoiceDetails.rate) -
                parseFloat(invoiceDetails.disc)}
            </td>
          </tr>
        </tbody>

        {/* Remain Same */}
        <tr>
          <td colSpan="6" className="font-bold bg-gray-100 text-center">
            Total
          </td>
          <td>
            <span>{invoiceDetails.total}</span>
          </td>
        </tr>

        <tr>
          <td
            colSpan="2"
            rowSpan="6"
            className="font-bold  align-top text-center"
          >
            Remarks
          </td>
          <td colSpan="3" className="font-bold  text-center">
            Summary
          </td>
          <td colSpan="2" className="font-bold  text-center">
            Amount
          </td>
        </tr>

        <tr>
          <td colSpan="3" className="font-bold text-center">
            Total Invoice Value
          </td>
          <td colSpan="2" className="font-bold text-center">
            {invoiceDetails.total}
          </td>
        </tr>

        <tr>
          <td colSpan="3" className="font-bold text-center">
            Total Discount
          </td>
          <td colSpan="2" className="font-bold text-center">
            {invoiceDetails.totalDiscount}
          </td>
        </tr>

        <tr>
          <td colSpan="2" className="font-bold text-center">
            Total CGST
          </td>
          <td colSpan="1" className="font-bold text-center">
            {invoiceDetails.precantageCgst}
          </td>
          <td colSpan="2" className="font-bold text-center">
            {invoiceDetails.cgst}
          </td>
        </tr>

        <tr>
          <td colSpan="2" className="font-bold text-center">
            Total SGST
          </td>
          <td colSpan="1" className="font-bold text-center">
            {invoiceDetails.precantageSgst}
          </td>
          <td colSpan="2" className="font-bold text-center">
            {invoiceDetails.sgst}
          </td>
        </tr>

        <tr>
          <td colSpan="3" className="font-bold text-center">
            Shipping Charges
          </td>
          <td colSpan="2" className="font-bold text-center">
            {invoiceDetails.shippingCharges}
          </td>
        </tr>

        <tr>
          <td
            rowSpan="3"
            colSpan="2"
            className="bg-gray-100 font-bold align-bottom text-center"
          >
            Authorized Signature
          </td>
          <td colSpan="3" className="font-bold text-center">
            Round Off
          </td>
          <td colSpan="2" className="font-bold text-center">
            {invoiceDetails.roundOff}
          </td>
        </tr>

        <tr>
          <td colSpan="3" className="font-bold text-center">
            Grand Total
          </td>
          <td colSpan="2" className="font-bold text-center">
            {invoiceDetails.grandTotal}
          </td>
        </tr>
      </table>
    </>
  );
}

export default Table;
