import React from "react";
import { IoChevronDown } from "react-icons/io5";
import Loader from "../../../../components/Loader/Loader";

const DataFrame = ({ data, title }) => {
  return (
    <>
      {!data.length ? (
        <Loader />
      ) : (
        <div className="overflow-x-auto">
          <table className="table-normal w-full border">
            <thead className="bg-gray-300 border">
              <tr>
                <th className="text-center font-normal py-2">S.N.</th>
                {title.map((t) => (
                  <th className="text-center font-normal py-2">{t}</th>
                ))}
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((t, index) => (
                <tr>
                  <th className="font-normal text-center text-xs py-2 border">
                    {index + 1}
                  </th>
                  <td className="text-center text-xs py-2 border">
                    {t.billId}
                  </td>
                  <td className="text-center text-xs py-2 border">{t.rooms}</td>
                  <td className="text-center text-xs py-2 border">{t.date}</td>
                  <td className="text-center text-xs py-2 border">{t.price}</td>
                  <td className="text-center text-xs py-2 border">
                    {t.delivered}
                  </td>
                  <td className="py-2 border">
                    <button className="flex mx-auto p-1 bg-black rounded ">
                      <IoChevronDown size={12} color="#fff" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default DataFrame;
