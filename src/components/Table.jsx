import React from "react";

function Table({ invoiceDetails, list, setList, totalDiscount }) {
  let total = 0;
  list.forEach(({ afterDisc }) => {
    const afterDiscValue = parseFloat(afterDisc);
    if (!isNaN(afterDiscValue)) {
      total += afterDiscValue;
    } else {
      console.error(`Invalid afterDisc value: ${afterDisc}`);
    }
  });

  return (
    <>
      <table width="100%" className="mt-5">
        <thead>
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
              <tr key={id} className="text-center">
                <td>{srNo}</td>
                <td>{productDetail}</td>
                <td>{kgOrGram}</td>
                <td>{rate}</td>
                <td>{value}</td>
                <td>{disc}</td>
                <td>{afterDisc}</td>
              </tr>
            )
          )}

          {/* Remain Same */}
          <tr>
            <td colSpan="6" className="font-bold bg-gray-100 text-center">
              Total
            </td>
            <td>
              <span>{total}</span>
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
            <td colSpan="2" className="font-bold text-center align-center">
              {total}
            </td>
          </tr>

          <tr>
            <td colSpan="3" className="font-bold text-center">
              Total Discount
            </td>
            <td colSpan="2" className="font-bold text-center">
              {totalDiscount}
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
              {total * 0.025}
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
              {total * 0.025}
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
              {total +
                2 * (total * 0.025) +
                parseInt(invoiceDetails.shippingCharges) +
                parseInt(invoiceDetails.roundOff)}
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default Table;
