import React from "react";

const InputView = ({ label, setValue, value }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor="" className="text-gray-600" style={{ fontSize: 12 }}>
        {label}
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={label}
        type="text"
        className="p-2 border border-gray-400 rounded w-full"
        style={{ fontSize: 12 }}
        name=""
        id=""
      />
    </div>
  );
};

export default InputView;
