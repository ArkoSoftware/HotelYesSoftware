import React from "react";
import Modal from "styled-react-modal";
import { IoClose } from "react-icons/io5";
import InputView from "../InputView";
import SelectView from "../SelectView";
import { useEffect } from "react";
import { addNewStock, getCategoryItem } from "./functions/function";

const ModalView = ({ isOpen, toggleModal }) => {
  const [unit, setUnit] = React.useState();
  const [itemName, setItemName] = React.useState();
  const [itemList, setItemList] = React.useState([]);
  const [categoryList, setCategoryList] = React.useState([]);
  const getAllData = async () => {
    const arr = [];
    const temp = await getCategoryItem();
    setItemList(temp);
    for (var i = 0; i < temp.length; i++) {
      arr.push(temp[i].itemName);
    }
    setItemName(arr[0]);
    setCategoryList(arr);
  };
  useEffect(() => {
    getAllData();
  }, []);
  return (
    <Modal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      <div className="bg-white rounded-xl p-5 w-1/3 ">
        <div className="flex">
          <span className="text-xl tracking-tighter">Add To Stock</span>
          <div className="ml-auto">
            <button onClick={toggleModal}>
              <IoClose size={20} />
            </button>
          </div>
        </div>
        <div className="mt-5">
          <SelectView
            label={"Item Name"}
            setValue={setItemName}
            data={categoryList}
          />
          <div className="my-4">
            <InputView label={"Unit (Litre)"} value={unit} setValue={setUnit} />
          </div>
          <button
            onClick={() => {
              const val = addNewStock(itemName, unit) || false;
              setItemName(categoryList[0]);
              setUnit();
              if (val) {
                toggleModal();
              }
            }}
            className="bg-green-700 p-3 text-white rounded-xl w-full mt-8"
          >
            Submit
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalView;
