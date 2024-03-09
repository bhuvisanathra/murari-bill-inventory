import React from "react";

function MainDetails() {
  return (
    <section className="flex flex-col items-end justify-end">
      <div className="md:text-xl">
        {" "}
        {/* Add this line */}
        <h2 className="font-bold text-xl uppercase flex items-end justify-end md:text-3xl">
          Murari Farshan Gruh
        </h2>
        <p className="text-right md:text-left">
          BELOW HOTEL MOON PALACE, M.G. ROAD PORBANDAR 360575
        </p>{" "}
        {/* Modify this line */}
      </div>
    </section>
  );
}

export default MainDetails;
