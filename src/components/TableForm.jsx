import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function TableForm({
  invoiceDetails,
  setInvoiceDetails,
  list,
  setList,
  handleChange,
  sum,
}) {
  const [isEdit, setIsEdit] = useState(false);
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
    setIsEdit(false);
    console.log(list);
  };

  // Edit Row
  const editRow = (id) => {
    const editingRow = list.find((row) => row.id === id);
    setList(list.filter((row) => row.id != id));
    setIsEdit(true);
    setInvoiceDetails(editingRow);
  };

  // Delete row
  const deleteRow = (id) => setList(list.filter((row) => row.id != id));

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className="font-bold text-2xl mt-5 mb-5 relative border-b-2">
          Add Items
        </h3>
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
            {isEdit ? "Edit Item" : "Add Item"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <h3 className="font-bold text-2xl mt-3 mb-5 relative border-b-2">
          Selected Items
        </h3>
        <table className="mt-5 mb-5 w-full border-2">
          <thead>
            <tr className="bg-gray-100 p-2">
              <th className="p-1">No</th>
              <th className="p-1">Product</th>
              <th className="p-1">KM/GM</th>
              <th className="p-1">Rate</th>
              <th className="p-1">Value</th>
              <th className="p-1">Discount</th>
              <th className="p-1">Value</th>
              <th colSpan="2" className="p-1">
                Edit
              </th>
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
                  <td className="p-1">
                    <button onClick={() => editRow(id)}>
                      <FaEdit className="text-blue-600 font-bold text-xl" />
                    </button>
                  </td>
                  <td className="p-1">
                    <button onClick={() => deleteRow(id)}>
                      <MdDelete className="text-red-600 font-bold text-xl" />
                    </button>
                  </td>
                </tr>
              )
            )}
            <tr className="">
              <td
                colSpan="5"
                className="font-bold bg-gray-100 text-center text-xl border-2"
              >
                Total
              </td>
              <td
                colSpan="4"
                className="p-1 text-center font-bold text-xl border-2"
              >
                <span>{sum}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}

export default TableForm;
