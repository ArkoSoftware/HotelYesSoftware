import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import ModalView from "./components/Assets/ModalView";
import ModalViewNewEntry from "./components/Assets/ModalViewNewEntry";
import { getItemList } from "./components/Assets/functions/function";
import { useEffect } from "react";
import DataFrame from "./components/Assets/DataFrame";

let title = ["Name", "Quantity"];
const AssetAndExpenses = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const [openPurchaseBill, setOpenPurchaseBill] = useState(false);
  const [stockData, setStockData] = useState([]);

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
    const arr = await getItemList();
    setStockData(arr);
  };

  useEffect(() => {
    getAllData();
  }, []);
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div className="text-2xl tracking-tighter">Manage Assets</div>
          <div className="flex flex-row">
            <button
              onClick={toggleModal}
              className="rounded-xl bg-blue-800 text-white text-sm py-2 px-8 mt-10 mx-4"
            >
              Add To Stock
            </button>
            <button
              onClick={toggleModal2}
              className="rounded-xl border border-gray-300 text-black text-sm py-2 px-8 mt-10 mx-4"
            >
              Add New Entry
            </button>
          </div>
        </div>
        <div className="px-12 pb-8">
          <DataFrame data={stockData} title={title} />
        </div>
        <ModalView isOpen={isOpen} toggleModal={toggleModal} />
        <ModalViewNewEntry
          setIsOpen={setIsOpenNew}
          isOpen={isOpenNew}
          toggleModal={toggleModal2}
        />
      </div>
    </ModalProvider>
  );
};

export default AssetAndExpenses;
