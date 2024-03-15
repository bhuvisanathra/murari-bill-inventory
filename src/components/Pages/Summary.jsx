import React, { useEffect, useState } from "react";
import SwitchButtons from "../components/SwitchButtons";
import axios from "axios";
import BASE_URL from "../../services/urls";
import SummaryBox from "./SummaryBox";

const ViewProductList = () => {
  return (
    <>
      <SwitchButtons />
      <div className="flex bg-white flex-col justify-center m-5 p-5 md:max-w-xl md:mx-auto lg:max-w-2xl xl:max-w-4xl">
        <SummaryBox />
      </div>
    </>
  );
};

export default ViewProductList;
