import React from "react";

function TableForm({ invoiceDetails, handleChange }) {
  return (
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
        <label htmlFor="afterDisc">After Disc.</label>
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
  );
}

export default TableForm;
