import {
  collection,
  doc,
  getDocs,
  getFirestore,
  updateDoc,
} from "firebase/firestore/lite";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { db } from "../../config/adminFirebase";
import { Bars } from 'react-loader-spinner'

const HierarchyManagement = () => {
  const [usersList, setUsersList] = useState([]);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const getUsersData = async () => {
    const usersDoc = collection(db, "usersList");
    const snap = await getDocs(usersDoc);
    const arr = [];
    snap.forEach((docs) => {
      arr.push({ ...docs.data(), id: docs.id });
    });
    setUsersList(arr);
  };

  useEffect(() => {
    getUsersData();
  }, []);

  const roleHandler = (id) => {
    setLoading(true);
    const db = getFirestore();
    const docRef = doc(db, "usersList", id);
    const data = {
      role: role,
    };

    updateDoc(docRef, data)
      .then(() => {
        toast.success("role added successfully");
        setLoading(false);
      })
      .catch((err) => {
        toast.error("role adding failed");
        setLoading(false);
      });
  };

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
            {usersList?.map((data, idx) => (
              <tr key={idx}>
                <td className="w-24 border border-gray-200 p-2 text-[10px]">
                  {idx + 1}
                </td>
                <td className="w-24 border border-gray-200 p-2 text-[10px]">
                  {data.name}
                </td>
                <td className="w-24 border border-gray-200 p-2 text-[10px]">
                  {data.role ? (
                    data.role
                  ) : (
                    <select onChange={(e) => setRole(e.target.value)}>
                      <option selected disabled>
                        Null
                      </option>
                      <option value="Admin">Admin</option>
                      <option value="Waiter">Waiter</option>
                      <option value="Chef">Chef</option>
                    </select>
                  )}
                </td>
                <td className="w-24 border border-gray-200 p-2 text-[10px]">
                  siddharthaghimire@gmail.com
                </td>
                <td className="w-24 border border-gray-200 p-2 text-[10px]">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => roleHandler(data.id)}
                      className="text-white bg-green-600  hover:bg-green-700 px-2 py-2 rounded"
                    >
                      {loading ? (
                        <Bars
                          height="30"
                          width="30"
                          color="#fff"
                          ariaLabel="bars-loading" 
                          visible={true}
                        />
                      ) :
                      "Give Access"
                      }
                    </button>
                    <button className="text-white bg-red-600 hover:bg-red-700 px-2 py-2 rounded">
                      Decline
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HierarchyManagement;
