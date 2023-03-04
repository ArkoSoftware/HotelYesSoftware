import React from "react";

const InputView = ({ label, setValue, error,value, required }) => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex ">
        <label htmlFor="" className="text-gray-600" style={{ fontSize: 11 }}>
          {label}
        </label>
        {error && !value ? (
          <span className="text-[10px] text-red-600 ml-1">
            * Field is empty
          </span>
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
        className={`p-2 border ${
          error && !value ? "border-red-500" : "border-gray-400"
        }  rounded w-full`}
        style={{ fontSize: 10 }}
        name=""
        id=""
      />
    </div>
  );
};

export default InputView;
