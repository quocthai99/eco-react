import React from "react";

const InputProduct = ({ label, register, errors, type = 'text', id, placeholder, validate }) => {
  
    return (
    <div>
      {label && <label className="block mb-2 text-sm font-medium text-white">
        {label}
      </label>}
      <input
        type={type}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder={placeholder}
        {...register(id, validate)}
      />
      {errors && <span className="text-sm text-main">{errors[id]?.message}</span>}
    </div>
  );
};

export default InputProduct;
