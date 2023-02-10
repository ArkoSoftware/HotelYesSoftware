import React, { useState } from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";
import SelectView from "../SelectView";
import DatePicker from "../DatePicker";
import PurchaseTable from "./MenuTable";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../../../config/adminFirebase";
import { addMenu } from "./functions/function";
import { extreSmallFont } from "../../../../theme";

const NewMenuEntry = ({ isOpen, toggleModal, rerender, setRerender }) => {
  const [foodName, setFoodName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [infoList, setInfoList] = useState("");
  const [categoryList, setCategoryList] = useState([]);
  const getAllData = async () => {
    const doc1 = collection(db, "menuCategory");
    const snap = await getDocs(doc1);
    const arr = [""];
    snap.forEach((docs) => {
      const data = docs.data()["category"];
      arr.push(data);
    });
    setCategoryList(arr);
  };
  useEffect(() => {
    getAllData();
  }, [rerender]);
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div
        className="bg-white rounded-xl p-8 overflow-y-scroll"
        style={{ width: "90%", height: "90%" }}
      >
        <div className="flex">
          <span className="text-xl tracking-tighter">Menu Entry</span>
          <div className="ml-auto flex space-x-3">
            <button
              className="bg-green-700 text-white rounded p-1 px-5"
              style={{ fontSize: extreSmallFont }}
              onClick={() => {
                if (addMenu(foodName, category, infoList, price)) {
                  toggleModal();
                  setRerender(!rerender);
                }
              }}
            >
              Save
            </button>
            <button
              className="bg-gray-300 rounded p-2 px-5"
              style={{ fontSize: extreSmallFont }}
              onClick={toggleModal}
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="mt-5 flex space-x-2 flex-wrap">
          <div className="flex-1">
            <InputView setValue={setFoodName} label={"Food Name"} />
          </div>
          <div className="flex-1">
            <SelectView
              setValue={setCategory}
              label={"Category"}
              data={categoryList}
            />
          </div>
          <div className="flex-1">
            <div className="flex-1">
              <InputView setValue={setPrice} label={"Price"} />
            </div>
          </div>
          <div className="flex-1"></div>
        </div>

        <div className="my-3 mt-7">
          <PurchaseTable setValue={setInfoList} />
        </div>
      </div>
    </Modal>
  );
};

export default NewMenuEntry;
/*
<SelectView
            label={"Item Name"}
            data={["Data 1", "Data 2", "Data 3", "Data 4"]}
          />
 <InputView label={"Unit (Litre)"} />*/
