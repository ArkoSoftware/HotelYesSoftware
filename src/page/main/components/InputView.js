import React from "react";
import { extreSmallFont, smallFont } from "../../../theme";

const InputView = ({ label, setValue, value }) => {
  return (
    <>
      <label
        htmlFor=""
        className="text-gray-600"
        style={{ fontSize: extreSmallFont }}
      >
        {label}{" "}
        {!value && (
          <span className="text-[10px] ml-2 text-red-500">
            * Field is empty.
          </span>
        )}
      </label>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={label}
        type="text"
        className="p-2 border border-gray-400 rounded w-full"
        style={{ fontSize: smallFont }}
        name=""
        id=""
      />
    </>
  );
};

export default InputView;
