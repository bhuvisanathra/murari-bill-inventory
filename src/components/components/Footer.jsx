import React from "react";

function Footer() {
  return (
    <footer className="footer border-gray-300 pt-5">
      {/* <footer className="footer border-t-2 border-gray-300 pt-5"> */}
      <ul className="flex flex-col items-end justify-center">
        <li>
          <span className="font-bold">GSTIN:</span> 24AADFM3406H2ZO{" "}
        </li>
        <li>
          <span className="font-bold">Contact No:</span> 0286 2246415/
          9924187544{" "}
        </li>
        <li>
          <span className="font-bold">Bank:</span> State Bank Of India{" "}
        </li>
        <li>
          <span className="font-bold">Account number:</span> 331120110000787{" "}
        </li>
        <li>
          <span className="font-bold">IFSC Code:</span> BK1D0003311{" "}
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
