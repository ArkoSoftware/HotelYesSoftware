import React from "react";

const InputView = ({ label, setValue, value, required }) => {
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
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        placeholder={value}
        type="text"
        className="p-2 border border-gray-400 rounded w-full"
        style={{ fontSize: 10 }}
        name=""
        id=""
      />
    </div>
  );
};

export default InputView;
