import { doc, updateDoc } from "firebase/firestore/lite";
import React from "react";
import { db } from "../../../../config/adminFirebase";
import { toast } from "react-hot-toast";

const EditMenuModal = ({
  tableData,
  modalIsOn,
  setModalIsOn,
  rerender,
  setRerender,
}) => {
  const updateMenuHandler = async (e) => {
    e.preventDefault();
    const form = e.target;
    const menuRef = doc(db, "menu", tableData.id);
    const data = {
      foodName: form.foodName.value,
      category: form.category.value,
      price: form.price.value,
    };
    await updateDoc(menuRef, data);
    setModalIsOn(!modalIsOn);
    setRerender(!rerender);
    toast.success(`${tableData.foodName} updated successfully!`);
  };
  return (
    <>
      <input type="checkbox" id="editMenuModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="editMenuModal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Update the food item</h3>
          <form onSubmit={(e) => updateMenuHandler(e)} className="py-4">
            <label htmlFor="foodName" className="block">
              Food Name
            </label>
            <input
              type="text"
              className="input input-bordered input-sm w-full mb-3"
              id="foodName"
              name="foodName"
              defaultValue={tableData.foodName}
              required
            />
            <label htmlFor="category" className="block">
              Category
            </label>
            <input
              type="text"
              className="input input-bordered input-sm w-full mb-3"
              id="category"
              name="category"
              defaultValue={tableData.category}
              required
            />
            <label htmlFor="price" className="block">
              Price
            </label>
            <input
              type="text"
              className="input input-bordered input-sm w-full"
              id="price"
              name="price"
              defaultValue={tableData.price}
              required
            />
            <div className="flex justify-center mt-6">
              <button className="bg-green-600 hover:bg-green-700 duration-500 px-4 py-1 text-white rounded">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditMenuModal;
