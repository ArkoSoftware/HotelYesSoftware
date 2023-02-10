import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getTableList } from "./components/Restaurant/functions/function";
import { TabData } from "./components/Restaurant/TabData";
import { ModalProvider } from "styled-react-modal";
import { OccupiedTab } from "./components/Restaurant/OccupiedTab";

const Restaurant = () => {
  const [tableData, setTableData] = useState([]);
  const [occupiedTable, setOccupiedTable] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState();
  const [rerender, setRerender] = useState(false);
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const getTableData = async () => {
    const arr = await getTableList();
    setOccupiedTable(arr.arr2);
    setTableData(arr.arr);
  };
  useEffect(() => {
    getTableData();
  }, [rerender]);
  return (
    <ModalProvider>
      <div className="p-5">
        <div className="text-base font-medium tracking-tighter mb-5">
          Restaurant Order
        </div>
        <OccupiedTab
          rerender={rerender}
          setRerender={setRerender}
          setSelectedTable={setSelectedTable}
          toggleModal={toggleModal}
          tableData={occupiedTable}
        />
        <div className="my-6"></div>
        <TabData
          rerender={rerender}
          setRerender={setRerender}
          setSelectedTable={setSelectedTable}
          toggleModal={toggleModal}
          tableData={tableData}
        />
      </div>
    </ModalProvider>
  );
};

export default Restaurant;
