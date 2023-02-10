import React from "react";
import { useLocation } from "react-router-dom";
import RecordTable from "./components/Vendor/RecordTable";
import Bill from "./components/Bill/Bill";

const BillPage = (props) => {
  const location = useLocation();
  const data = location.state;
  const profile = data[1][1];
  return (
    <div className="p-7">
      <div className="font-bold tracking-tighter text-2xl">Bill</div>
      <div className="flex flex-col space-y-2 py-8">
        <div className="flex flex-row">
          <div className=" tracking-tighter text-sm font-bold ">
            Vendor Name:
          </div>
          <div className=" tracking-tighter text-sm ml-5">
            {profile.vendorName}
          </div>
        </div>
        <div className="flex flex-row">
          <div className=" tracking-tighter text-sm font-bold ">
            Vendor Company:
          </div>
          <div className=" tracking-tighter text-sm ml-5">
            {profile.vendorCompany}
          </div>
        </div>
        <div className="flex flex-row">
          <div className=" tracking-tighter text-sm font-bold ">Address:</div>
          <div className=" tracking-tighter text-sm ml-5">
            {profile.vendorAddress}
          </div>
        </div>

        <div className="pt-10"></div>
        <div className=" tracking-tighter text-xl font-bold ">
          Transaction History
        </div>
        <Bill billNo={data[0]} />
      </div>
    </div>
  );
};

export default BillPage;
