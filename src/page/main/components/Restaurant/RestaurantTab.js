import React from "react";
import { IoEllipsisVertical } from "react-icons/io5";
import { getTableList } from "./functions/function";
import { extreSmallFont, mediumFont } from "../../../../theme";

export const RestaurantTab = ({ rerender }) => {
  const [tableData, setTableData] = React.useState([]);
  const getAllData = async () => {
    const arr = await getTableList();
    console.log(arr);
    setTableData(arr);
  };

  React.useEffect(() => {
    getAllData();
  }, [rerender]);
  return (
    <div className="flex flex-row flex-wrap ">
      {tableData.map((item) => (
        <div className="p-4">
          <RestaurantCard item={item} />
        </div>
      ))}
    </div>
  );
};

export const RestaurantCard = ({ item }) => {
  return (
    <div className="bg-gray-200 w-24 h-24 rounded-2xl flex flex-col p-4">
      <div className="ml-auto">
        <IoEllipsisVertical size={12} />
      </div>
      <div
        className="text-2xl text-center my-auto"
        style={{ fontSize: mediumFont }}
      >
        {item.tableNumber}
      </div>
    </div>
  );
};
