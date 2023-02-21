import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import { useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { RotatingLines } from "react-loader-spinner"; 
import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../../config/adminFirebase";
import { largeFont } from "../../theme"; 
import DataFrame from "./components/Menu/DataFrame";

let title = ["Food Name", "Category", "Recipe", "Price"];
const Menu = () => {
  const [rerender, setRerender] = useState(false);
  const [dataList, setDataList] = useState([]); 
 
  const getMenuData = async () => {
    const doc1 = collection(db, "menu");
    const snap = await getDocs(doc1);
    const arr = [];
    snap.forEach((docs) => {
      arr.push({ ...docs.data(), id: docs.id });
    });
    setDataList(arr);
  };

  useEffect(() => {
    getMenuData();
  }, [rerender]);

  const searchHandler = (event) => {
    event.preventDefault();
    const form = event.target;
    const searchField = form.searchField.value;
    const searchedData = dataList.filter(
      (data) =>
        data.foodName.toLowerCase().includes(searchField.toLowerCase()) ||
        data.category.toLowerCase().includes(searchField.toLowerCase())
    );
    const restData = dataList.filter(
      (data) =>
        !(
          data.foodName.toLowerCase().includes(searchField.toLowerCase()) ||
          data.category.toLowerCase().includes(searchField.toLowerCase())
        )
    );
    setDataList([...searchedData, ...restData]);
  };

  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div
            className="text-2xl tracking-tighter"
            style={{ fontSize: largeFont }}
          >
            Menu
          </div>
          <div className="block md:flex items-center justify-end mt-10">
            <form onSubmit={searchHandler} className="m-0 md:mr-5 flex">
              <input
                type="text"
                placeholder="Search here"
                name="searchField"
                className="input input-bordered border-green-600 input-sm w-full md:w-96 rounded-tr-none rounded-br-none"
              />
              <button className="bg-green-600 px-2 text-white rounded-tr rounded-br">
                <CiSearch />
              </button>
            </form>
          </div>
        </div>
        {!dataList.length ? (
          <div className="absolute top-[30%] left-0 right-0 mx-auto flex justify-center">
            <RotatingLines
              strokeColor="#00af41"
              strokeWidth="5"
              animationDuration="0.75"
              width="76"
              visible={true}
            />
          </div>
        ) : (
          <div className="px-12 pb-8">
            <DataFrame
              data={dataList}
              setRerender={setRerender}
              rerender={rerender}
              title={title}
            />
          </div>
        )}
      </div>
    </ModalProvider>
  );
};

export default Menu;
