import React from "react";

const SelectView = ({ label, data, setValue }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor="" className="text-gray-600" style={{ fontSize: 8 }}>
        {label}
      </label>
      <select
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="p-2 border border-gray-400 rounded w-full text-sm"
        style={{ fontSize: 10 }}
      >
        {data.map((d1) => (
          <option className="capitalize" value={d1}>
            {d1}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectView;
