import React from "react";
import { ModalProvider } from "styled-react-modal";

const Menu = () => {
  return (
    <ModalProvider>
      <div className="w-full h-full">
        <div className="p-8">
          <div className="text-2xl tracking-tighter">Menu</div>
        </div>
      </div>
    </ModalProvider>
  );
};

export default Menu;
