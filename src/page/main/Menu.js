import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import NewMenuEntry from "./components/Menu/NewMenuEntry";
import NewCategory from "./components/Menu/NewCategory";
import { useEffect } from "react";
import DataFrame from "./components/Menu/DataFrame";
import { collection, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../../config/adminFirebase";
import { extreSmallFont, largeFont } from "../../theme";

let data = [
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
  { productId: 10251, productName: "VICTE", quantity: 20 },
  { productId: 10248, productName: "VINET", quantity: 190 },
  { productId: 10249, productName: "TOMSP", quantity: 23 },
  { productId: 10250, productName: "HANAR", quantity: 23 },
];
let title = ["Food Name", "Category", "Recipe", "Price"];
const Menu = () => {
  const [rerender, setRerender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenNew, setIsOpenNew] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [openPurchaseBill, setOpenPurchaseBill] = useState(false);
  const [openAddCategory, setAddCategory] = useState(false);
  function toggleModal3(e) {
    setOpenPurchaseBill(!openPurchaseBill);
  }
  function toggleModal2(e) {
    setAddCategory(!openAddCategory);
  }
  const getMenuData = async () => {
    const doc1 = collection(db, "menu");
    const snap = await getDocs(doc1);
    const arr = [];
    snap.forEach((docs) => {
      arr.push(docs.data());
    });
    setDataList(arr);
  };
  useEffect(() => {
    getMenuData();
  }, [rerender]);
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div
            className="text-2xl tracking-tighter"
            style={{ fontSize: largeFont }}
          >
            Manage Menu
          </div>
          <div className="flex flex-row">
            <button
              onClick={toggleModal3}
              className="rounded-xl border bg-green-700 text-white text-sm py-1 px-8 mt-10 mx-4"
              style={{ fontSize: extreSmallFont }}
            >
              New Entry
            </button>
            <button
              onClick={toggleModal2}
              className="rounded-xl border border-green-700 text-green-700 text-sm py-1 px-8 mt-10 mx-4"
              style={{ fontSize: extreSmallFont }}
            >
              New Category
            </button>
          </div>
        </div>
        <div className="px-12 pb-8">
          <DataFrame data={dataList} title={title} />
        </div>

        <NewMenuEntry
          rerender={rerender}
          setRerender={setRerender}
          isOpen={openPurchaseBill}
          toggleModal={toggleModal3}
        />
        <NewCategory
          rerender={rerender}
          setRerender={setRerender}
          isOpen={openAddCategory}
          setIsOpen={setAddCategory}
          toggleModal={toggleModal2}
        />
      </div>
    </ModalProvider>
  );
};

export default Menu;
