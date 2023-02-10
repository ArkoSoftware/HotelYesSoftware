import React, { useState } from "react";
import { ModalProvider } from "styled-react-modal";
import ModalView from "./components/Restaurant/ModalView";
import { RestaurantTab } from "./components/Restaurant/RestaurantTab";
import { extreSmallFont, largeFont } from "../../theme";

const Restaurant = () => {
  const [rerender, setRerender] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal(e) {
    setIsOpen(!isOpen);
  }
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div
            className="text-2xl tracking-tighter"
            style={{ fontSize: largeFont }}
          >
            Manage Table
          </div>
          <button
            onClick={toggleModal}
            className="rounded-xl bg-blue-800 text-white text-sm py-1 px-6 mt-10 mx-4"
            style={{ fontSize: extreSmallFont }}
          >
            Add New Table
          </button>
          <div className="pt-5">
            <RestaurantTab rerender={rerender} />
          </div>
        </div>
        <ModalView
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          toggleModal={toggleModal}
          setRerender={setRerender}
          rerender={rerender}
        />
      </div>
    </ModalProvider>
  );
};

export default Restaurant;
