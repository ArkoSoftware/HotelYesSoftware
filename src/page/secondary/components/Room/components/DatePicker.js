import React, { useState } from "react";
import Modal from "styled-react-modal";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePicker = ({ label, setValue, value }) => {
  const [selected, setSelected] = React.useState(new Date());
  const [isDateOpen, setDateIsOpen] = useState(false);
  function toggleModal(e) {
    setDateIsOpen(!isDateOpen);
  }
  let footer = <p>Please pick a day.</p>;

  const changed = (e) => {
    setSelected(e);
    setValue(new Date(e).getTime());
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="" className="text-gray-600" style={{ fontSize: 10 }}>
        {label}
      </label>
      <button
        onClick={toggleModal}
        className="p-2 border text-sm border-gray-400 rounded w-full text-left text-black"
        style={{ fontSize: 12 }}
      >
        {value == "Select Date"
          ? value
          : new Date(parseInt(value)).toDateString()}
      </button>
      <Modal
        isOpen={isDateOpen}
        onBackgroundClick={toggleModal}
        onEscapeKeydown={toggleModal}
      >
        <div className="bg-white p-3 rounded-xl">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={(e) => changed(e)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default DatePicker;
