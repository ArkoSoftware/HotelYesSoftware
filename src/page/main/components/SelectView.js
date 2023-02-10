import React from "react";
import { extreSmallFont, smallFont } from "../../../theme";

const SelectView = ({ label, data, setValue }) => {
  return (
    <>
      <label
        htmlFor=""
        className="text-gray-600"
        style={{ fontSize: extreSmallFont }}
      >
        {label}
      </label>
      <select
        onChange={(e) => {
          setValue(e.target.value);
        }}
        className="p-2 border border-gray-400 rounded w-full text-sm"
      >
        {data.map((d1) => (
          <option
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
