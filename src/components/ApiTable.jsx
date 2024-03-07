import React from "react";

function Table({ invoiceDetails, list = [] }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="mt-5 w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-1">Sr No</th>
              <th className="p-1">Product Details</th>
              <th className="p-1">KM/GM</th>
              <th className="p-1">Rate</th>
              <th className="p-1">Value</th>
              <th className="p-1">Discount</th>
              <th className="p-1">Total</th>
            </tr>
          </thead>
          <tbody>
            {/* Check if list is defined before mapping */}
            {list &&
              list.map(
                ({
                  id,
                  srNo,
                  productDetail,
                  kgOrGram,
                  rate,
                  value,
                  discount,
                  afterDisc,
                }) => (
                  <tr
                    key={id}
                    className="text-center"
                    style={{ marginBottom: "5px" }}
                  >
                    <td className="p-1">{srNo}</td>
                    <td className="p-1">{productDetail}</td>
                    <td className="p-1">{kgOrGram}</td>
                    <td className="p-1">{rate}</td>
                    <td className="p-1">{value}</td>
                    <td className="p-1">{discount}</td>
                    <td className="p-1">{value - discount}</td>
                  </tr>
                )
              )}
            {/* Remain Same */}
            <tr>
              <td
                colSpan="2"
                rowSpan="6"
                className="font-bold align-top text-center"
              >
                Remarks
              </td>
              <td colSpan="3" className="font-bold text-center">
                Summary
              </td>
              <td colSpan="2" className="font-bold text-center">
                Amount
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="font-bold text-center">
                Total
              </td>
              <td colSpan="2" className="font-bold text-center">
                {invoiceDetails.totalValue}
              </td>
            </tr>
            <tr>
              <td colSpan="3" className="font-bold text-center">
                Discount
              </td>
              <td colSpan="2" className="font-bold text-center">
                {invoiceDetails.totalDiscount}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="font-bold text-center">
                CGST
              </td>
              <td colSpan="1" className="font-bold text-center">
                2.50%
              </td>
              <td colSpan="2" className="font-bold text-center">
                {invoiceDetails.totalCgst}
              </td>
            </tr>
            <tr>
              <td colSpan="2" className="font-bold text-center">
                SGST
              </td>
              <td colSpan="1" className="font-bold text-center">
                2.50%
              </td>
              <td colSpan="2" className="font-bold text-center">
                {invoiceDetails.totalSgst}
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
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
