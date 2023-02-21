import React, { useContext, useState } from "react";
import { ModalProvider } from "styled-react-modal";
import ModalView from "./components/Stock/ModalView";
import ModalViewNewEntry from "./components/Stock/ModalViewNewEntry";
import NewPurchaseBill from "./components/Stock/NewPurchaseBill";
import { getItemList } from "./components/Stock/functions/function";
import { useEffect } from "react";
import DataFrame from "./components/Stock/DataFrame";
import { NavContext } from "../../contexts/NavProvider";

let data = [
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
  { productId: 10251, productName: "VICTE", quantity: 20 },
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
];
let title = ["Name", "Category", "Quantity"];
const Stock = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const [openPurchaseBill, setOpenPurchaseBill] = useState(false);
  const [stockData, setStockData] = useState([]);
  const { sideBarOn, setSideBarOn } = useContext(NavContext);

  function toggleModal(e) {
    setIsOpen(!isOpen);
    setSideBarOn(!sideBarOn)
  }
  function toggleModal2(e) {
    setIsOpenNew(!isOpenNew);
    setSideBarOn(!sideBarOn)
  }
  function toggleModal3(e) {
    setOpenPurchaseBill(!openPurchaseBill);
    setSideBarOn(!sideBarOn)
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
          <div className="text-2xl tracking-tighter">Manage Stock</div>
          <div className="flex flex-col md:flex-row">
            <button
              onClick={toggleModal}
              className="rounded-xl bg-blue-800 text-white text-sm py-2 px-8 mt-5 md:mt-10 mx-4"
            >
              Add To Stock
            </button>
            <button
              onClick={toggleModal2}
              className="rounded-xl border border-gray-300 text-black text-sm mt-5 py-2 px-8 md:mt-10 mx-4"
            >
              Add New Entry
            </button>
            <button
              onClick={toggleModal3}
              className="rounded-xl border bg-green-700 text-white text-sm mt-5 py-2 px-8 md:mt-10 mx-4"
            >
              New Purchase Bill
            </button>
          </div>
        </div>
        <div className="p-0 md:px-12 md:pb-8">
          <DataFrame data={stockData} title={title} />
        </div>
        <ModalView isOpen={isOpen} toggleModal={toggleModal} />
        <ModalViewNewEntry
          setIsOpen={setIsOpenNew}
          isOpen={isOpenNew}
          toggleModal={toggleModal2}
        />
        <NewPurchaseBill isOpen={openPurchaseBill} toggleModal={toggleModal3} />
      </div>
    </ModalProvider>
  );
};

export default Stock;
