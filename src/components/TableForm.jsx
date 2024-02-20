import React from "react";
import { v4 as uuidv4 } from "uuid";

function TableForm({
  invoiceDetails,
  setInvoiceDetails,
  list,
  setList,
  handleChange,
}) {
  const handleSubmit = (e) => {
    e.preventDefault();

    const newItems = {
      id: uuidv4(),
      srNo: invoiceDetails.srNo,
      productDetail: invoiceDetails.productDetail,
      kgOrGram: invoiceDetails.kgOrGram,
      rate: invoiceDetails.rate,
      value: invoiceDetails.kgOrGram * invoiceDetails.rate,
      disc: invoiceDetails.disc,
      afterDisc:
        invoiceDetails.kgOrGram * invoiceDetails.rate - invoiceDetails.disc,
      total:
        invoiceDetails.kgOrGram * invoiceDetails.rate - invoiceDetails.disc,
    };
    setList([...list, newItems]);
    console.log(list);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <article className="md:grid grid-cols-7 gap-8">
          <div className="flex flex-col">
            <label htmlFor="srNo">Sr no</label>
            <input
              type="no"
              name="srNo"
              id="srNo"
              className="mb-3"
              placeholder="Enter Serial No"
              autoComplete="off"
              value={invoiceDetails.srNo}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="productDetails">Product</label>
            <input
              type="text"
              name="productDetail"
              id="productDetails"
              className="mb-3"
              placeholder="Enter Product Name"
              autoComplete="off"
              value={invoiceDetails.productDetail}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="kg/gram">Kg/Gram</label>
            <input
              type="no"
              name="kgOrGram"
              id="kg/gram"
              className="mb-3"
              placeholder="Enter Serial No"
              autoComplete="off"
              value={invoiceDetails.kgOrGram}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="rate">Rate</label>
            <input
              type="no"
              name="rate"
              id="rate"
              className="mb-3"
              placeholder="Enter Rate"
              autoComplete="off"
              value={invoiceDetails.rate}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="value">Value</label>
            <input
              type="no"
              name="value"
              id="value"
              className="mb-3"
              placeholder="Enter Serial No"
              autoComplete="off"
              value={invoiceDetails.kgOrGram * invoiceDetails.rate}
              onChange={handleChange}
              readOnly
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="disc">Discount</label>
            <input
              type="no"
              name="disc"
              id="srNo"
              className="mb-3"
              placeholder="Enter Discount"
              autoComplete="off"
              value={invoiceDetails.disc}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="afterDisc">Aft Dis</label>
            <input
              type="no"
              name="afterDisc"
              id="afterDisc"
              className="mb-3"
              placeholder="After Disc"
              autoComplete="off"
              value={
                (invoiceDetails.total =
                  parseFloat(invoiceDetails.kgOrGram) *
                    parseFloat(invoiceDetails.rate) -
                  parseFloat(invoiceDetails.disc))
              }
              readOnly
              onChange={handleChange}
            />
          </div>
        </article>
        <div>
          <button
            type="submit"
            className="mb-5 bg-blue-500 text-white font-bold py-2 px-8 rounded shadow border-2 border-blue-500 hover:bg-transparent hover:text-blue-500 transition-all duration-300"
          >
            Add Item
          </button>
        </div>
      </form>

      <table width="100%" className="mt-5 mb-5">
        <thead>
          <tr className="bg-gray-100 p-1">
            <th>Sr No</th>
            <th>Product Details</th>
            <th>KM/GM</th>
            <th>Rate</th>
            <th>Value</th>
            <th>Discount</th>
            <th>After Discount</th>
          </tr>
        </thead>

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
            <React.Fragment key={id}>
              <tbody>
                <tr className="text-center">
                  <td>{srNo}</td>
                  <td>{productDetail}</td>
                  <td>{kgOrGram}</td>
                  <td>{rate}</td>
                  <td>{value}</td>
                  <td>{disc}</td>
                  <td>{afterDisc}</td>
                </tr>
              </tbody>
            </React.Fragment>
          )
        )}
      </table>
    </>
  );
}

export default TableForm;
