import React, { useState } from "react";
import Modal from "styled-react-modal";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const DatePicker = ({ label, setValue, value, required }) => {
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
    <>
      <div className="flex">
        <label htmlFor="" className="text-gray-600" style={{ fontSize: 11 }}>
          {label}
        </label>
        {required ? (
          <span className="text-sm text-red-600">*</span>
        ) : (
          <>
            <span className="text-sm text-red-600"></span>{" "}
          </>
        )}
      </div>
      <button
        onClick={toggleModal}
        className="p-2 border border-gray-400 rounded w-full text-left text-gray-400"
        style={{ fontSize: 10 }}
      >
        {value == "" ? "Select Date" : new Date(parseInt(value)).toDateString()}
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
    </>
  );
};

export default DatePicker;
