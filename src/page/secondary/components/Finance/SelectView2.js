import React from "react";

const SelectView2 = ({ label, data, setValue, required }) => {
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
          console.log(e.target.value);
        }}
        className="p-2 border border-gray-400 rounded w-full text-sm"
        style={{ fontSize: 10 }}
      >
        <option className="capitalize" value={""}></option>
        {data.map((d1) => (
          <option
            className="capitalize"
            value={JSON.stringify({ name: d1.name, number: d1.number })}
          >
            {d1.name} ({d1.number.slice(-3).padStart(d1.number.length, "*")})
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectView2;
