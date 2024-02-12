import React from 'react'

function Dates({invoiceNo,invoiceDate}) {
  return (
    <article className='mt-5 flex items-end justify-end'>
    <ul>
      <li><span className="font-bold">Invoice Number:</span> {invoiceNo}</li>
      <li><span className="font-bold">Invoice date:</span> {invoiceDate}</li>
    </ul>
  </article>
  )
}

export default Dates