import React from "react";
import { extreSmallFont } from "../../theme";
import DataFrame from "./components/Menu/DataFrame";

const HierarchyManagement = () => {
  return (
    <div>
      <h2 className="text-lg p-8 tracking-tighter">Hierarchy Management</h2>

      <div className="overflow-x-auto px-12 pb-8">
        <table className="w-full">
          <thead>
            <tr className="border">
              <td className="w-24 text-[10px] text-left rounded-none bg-gray-300 p-2 font-medium">
                S.N.
              </td>
              <td className="text-center text-[10px] bg-gray-300 p-2 font-medium">
                Name
              </td>
              <td className="text-center text-[10px] bg-gray-300 p-2 font-medium">
                Role
              </td>
              <td className="text-center text-[10px] rounded-none bg-gray-300 p-2 font-medium">
                Email
              </td>
              <td className="text-center text-[10px] rounded-none bg-gray-300 p-2 font-medium">
                Actions
              </td>
            </tr>
          </thead>
          <tbody>
            {/* this is static table | need to get users data from firebase */}
            {[1,2,3].map(data => 
            <tr>
              <td className="w-24 border border-gray-200 p-2 text-[10px]">1</td>
              <td className="w-24 border border-gray-200 p-2 text-[10px]">
                siddharthaghimire
              </td>
              <td className="w-24 border border-gray-200 p-2 text-[10px]">
                Admin
              </td>
              <td className="w-24 border border-gray-200 p-2 text-[10px]">
                siddharthaghimire@gmail.com
              </td>
              <td className="w-24 border border-gray-200 p-2 text-[10px]">
                <div className="flex justify-center gap-2"> 
                  <button className="text-white bg-green-600 hover:bg-green-700 px-2 py-2 rounded">
                    Give Access
                  </button>
                  <button className="text-white bg-red-600 hover:bg-red-700 px-2 py-2 rounded">
                    Decline
                  </button>
                </div>
              </td>
            </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HierarchyManagement;
