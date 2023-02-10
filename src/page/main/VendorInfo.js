import React from "react";
import { useLocation } from "react-router-dom";
import RecordTable from "./components/Vendor/RecordTable";
import { useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../../config/adminFirebase";
import { useState } from "react";

const VendorInfo = ({ t }) => {
  const location = useLocation();
  const data = location.state;
  const [history, setHistory] = useState([]);
  const getVendorInfoList = async () => {
    const doc1 = collection(db, "purchaseBill");
    const q = query(doc1, where("vendorName", "==", data[1].vendorName));
    const snap = await getDocs(q);
    const arr = [];
    snap.forEach((docs) => {
      const data = docs.data();
      arr.push([docs.id, data]);
    });
    setHistory(arr);
  };
  useEffect(() => {
    getVendorInfoList();
  }, []);
  return (
    <div className="p-7">
      <div className="font-bold tracking-tighter text-2xl">Vendor Info</div>
      <div className="flex flex-col space-y-2 py-8">
        <div className="flex flex-row">
          <div className=" tracking-tighter text-sm font-bold ">
            Vendor Name:
          </div>
          <div className=" tracking-tighter text-sm ml-5">
            {data[1].vendorName}
          </div>
        </div>
        <div className="flex flex-row">
          <div className=" tracking-tighter text-sm font-bold ">
            Vendor Company:
          </div>
          <div className=" tracking-tighter text-sm ml-5">
            {data[1].vendorCompany}
          </div>
        </div>
        <div className="flex flex-row">
          <div className=" tracking-tighter text-sm font-bold ">Address:</div>
          <div className=" tracking-tighter text-sm ml-5">
            {data[1].vendorAddress}
          </div>
        </div>

        <div className="pt-10"></div>
        <div className=" tracking-tighter text-xl font-bold ">
          Transaction History
        </div>
        <RecordTable history={history} profile={data} />
      </div>
    </div>
  );
};

export default VendorInfo;
