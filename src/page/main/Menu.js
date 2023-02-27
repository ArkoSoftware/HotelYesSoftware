import React, { useContext, useState } from "react";
import { ModalProvider } from "styled-react-modal";
import NewMenuEntry from "./components/Menu/NewMenuEntry";
import NewCategory from "./components/Menu/NewCategory";
import { useEffect } from "react";
import DataFrame from "./components/Menu/DataFrame";
import { collection, doc, getDocs } from "firebase/firestore/lite";
import { db } from "../../config/adminFirebase";
import { extreSmallFont, largeFont } from "../../theme";
import { NavContext } from "../../contexts/NavProvider";
import { CiSearch } from "react-icons/ci";
import { RotatingLines } from "react-loader-spinner";

 
let title = ["Food Name", "Category", "Recipe", "Price", "Action"];
const Menu = () => {
  const [rerender, setRerender] = useState(false); 
  const [dataList, setDataList] = useState([]);
  const [openPurchaseBill, setOpenPurchaseBill] = useState(false);
  const [openAddCategory, setAddCategory] = useState(false);
  const { sideBarOn, setSideBarOn } = useContext(NavContext);


  function toggleModal3(e) {
    setOpenPurchaseBill(!openPurchaseBill);
    setSideBarOn(!sideBarOn);
  }
  function toggleModal2(e) {
    setAddCategory(!openAddCategory);
    setSideBarOn(!sideBarOn);
  }
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
            Manage Menu
          </div>
          <div className="block md:flex items-center justify-between mt-10">
            <div className="flex justify-between mb-5 md:m-0 lg:block">
              <button
                onClick={toggleModal3}
                className="rounded border bg-green-600 text-white text-sm py-1 px-8 m-0 md:mx-4"
                style={{ fontSize: extreSmallFont }}
              >
                New Entry
              </button>
              <button
                onClick={toggleModal2}
                className="rounded border duration-500 border-green-600 hover:bg-green-600 text-green-600 hover:text-white text-sm py-1 px-8 m-0 md:mx-4"
                style={{ fontSize: extreSmallFont }}
              >
                New Category
              </button>
            </div>
            <form onSubmit={searchHandler} className="m-0 md:mr-5 flex">
              <input
                type="text"
                placeholder="Search here"
                name="searchField"
                className="input input-bordered border-green-600 input-sm w-full max-w-xs rounded-tr-none rounded-br-none"
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
          <div className="pl-1 md:px-12 md:pb-8">
            <DataFrame
              data={dataList}
              setRerender={setRerender}
              rerender={rerender}
              title={title}
            />
          </div>
        )}

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
