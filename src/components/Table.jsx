import React from "react";

function Table({ invoiceDetails, list, setList, totalDiscount, sum }) {
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
            {/* Changable Data */}
            {list.map(
              ({
                id,
                srNo,
                productDetail,
                kgOrGram,
                rate,
                value,
                disc,
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
                  <td className="p-1">{disc}</td>
                  <td className="p-1">{afterDisc}</td>
                </tr>
              )
            )}

            {/* Remain Same */}
            <tr>
              <td colSpan="4" className="font-bold bg-gray-100 text-center">
                Total
              </td>
              <td colSpan="3" className="p-1 text-center">
                <span>{sum}</span>
              </td>
            </tr>

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
                {sum}
              </td>
            </tr>

            <tr>
              <td colSpan="3" className="font-bold text-center">
                Discount
              </td>
              <td colSpan="2" className="font-bold text-center">
                {totalDiscount}
              </td>
            </tr>

            <tr>
              <td colSpan="2" className="font-bold text-center">
                CGST
              </td>
              <td colSpan="1" className="font-bold text-center">
                {invoiceDetails.precantageCgst}
              </td>
              <td colSpan="2" className="font-bold text-center">
                {sum * 0.025}
              </td>
            </tr>

            <tr>
              <td colSpan="2" className="font-bold text-center">
                SGST
              </td>
              <td colSpan="1" className="font-bold text-center">
                {invoiceDetails.precantageSgst}
              </td>
              <td colSpan="2" className="font-bold text-center">
                {sum * 0.025}
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
                {sum +
                  2 * (sum * 0.025) +
                  parseInt(invoiceDetails.shippingCharges) +
                  parseInt(invoiceDetails.roundOff)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
