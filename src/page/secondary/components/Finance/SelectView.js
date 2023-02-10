import React from "react";

const SelectView = ({ label, data, setValue, required }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex ">
        <label htmlFor="" className="text-gray-600" style={{ fontSize: 11 }}>
          {label}
        </label>
        {required ? (
          <span className="text-sm text-red-600">*</span>
        ) : (
          <>
            <span className="text-sm text-red-600"></span>
          </>
        )}
      </div>
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
