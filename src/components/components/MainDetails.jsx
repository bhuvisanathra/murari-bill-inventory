import React from "react";

function MainDetails() {
  return (
    <section
      className="flex flex-col items-end justify-end"
      style={{ marginTop: "-10px" }}
    >
      <div className="md:text-xl">
        <h2 className="font-bold text-xl uppercase flex items-start justify-start md:text-3xl sm:text-2xl mb-0.5 ">
          Murari Farshan Gruh
        </h2>
        <div className="mt-2 mb-2 border-b-2 border-gray-300"></div>
        <p className="text-left md:text-left" style={{ fontSize: "18px" }}>
          Below Hotel Moon Palace, M.G. Road Porbandar 360575
        </p>{" "}
        <p className="text-left md:text-left " style={{ fontSize: "14px" }}>
          <span className="font-bold">GSTIN:</span> 24AADFM3406H2ZO,
        </p>{" "}
        <p className="text-left md:text-left " style={{ fontSize: "14px" }}>
          <span className="font-bold">Contact No:</span> 0286 2246415 /
          9924187544
        </p>{" "}
        <p className="text-left md:text-left " style={{ fontSize: "14px" }}>
          <span className="font-bold">Bank:</span> State Bank Of India
        </p>{" "}
        <p className="text-left md:text-left" style={{ fontSize: "14px" }}>
          <span className="font-bold">Account number:</span> 331120110000787
        </p>{" "}
        <p className="text-left md:text-left" style={{ fontSize: "14px" }}>
          <span className="font-bold">IFSC Code:</span> BK1D0003311
        </p>{" "}
      </div>
    </section>
  );
}

export default MainDetails;
