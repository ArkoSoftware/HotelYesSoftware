import React from "react";
import { extreSmallFont, smallFont } from "../../../theme";

const SelectView = ({ label, data, setValue, value }) => {
  return (
    <>
      <label
        htmlFor=""
        className="text-gray-600"
        style={{ fontSize: extreSmallFont }}
      >
        {label} {!value && <span className="text-red-500">* Select a {label}</span>}
      </label>
      <select
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className={`p-2 border ${
          value ? "border-gray-400" : "border-red-500"
        }  rounded w-full text-sm`}
      >
        {data.map((d1, idx) => (
          <option
            key={idx}
            className="capitalize"
            value={d1}
            style={{ fontSize: smallFont }}
          >
            {d1}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectView;
