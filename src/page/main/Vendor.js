import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import DataFrame from "../main/components/Vendor/DataFrame";
import NewPurchaseBill from "../main/components/Stock/NewPurchaseBill";
import ModalView from "./components/Vendor/ModalView";
import { useEffect } from "react";
import { getVendorList } from "./components/Vendor/functions/function";

let title = ["Vendor Name", "Company", "Address"];
const Vendor = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const [openPurchaseBill, setOpenPurchaseBill] = useState(false);
  const [data, setData] = useState([]);
  function toggleModal(e) {
    setIsOpen(!isOpen);
  }
  function toggleModal2(e) {
    setIsOpenNew(!isOpenNew);
  }
  function toggleModal3(e) {
    setOpenPurchaseBill(!openPurchaseBill);
  }
  const getAllData = async () => {
    const arr = await getVendorList();
    setData(arr);
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div className="text-2xl tracking-tighter">Vendor List</div>
          <div className="flex flex-row">
            <button
              onClick={toggleModal}
              className="rounded-xl bg-blue-800 text-white text-sm py-2 px-8 mt-10 mx-4"
            >
              Add Vendor
            </button>
            <button
              onClick={toggleModal3}
              className="rounded-xl border bg-green-700 text-white text-sm py-2 px-8 mt-10 mx-4"
            >
              New Bill
            </button>
          </div>
        </div>
        <div className="px-12 pb-8">
          <DataFrame data={data} title={title} />
        </div>
        <ModalView isOpen={isOpen} toggleModal={toggleModal} />
        <NewPurchaseBill isOpen={openPurchaseBill} toggleModal={toggleModal3} />
      </div>
    </ModalProvider>
  );
};

export default Vendor;
