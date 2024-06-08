import React from "react";

import { icons } from "../ultils/icons";

const { IoIosArrowDown } = icons;

const SelectProduct = ({title, type, fullW}) => {
  

  return (
    <div className={`relative border h-[45px] hover:outline hover:outline-2 cursor-pointer ${fullW ? 'w-full' : ''}`}>
      <div className="flex items-center justify-between gap-5 px-5 ">
        <span className="text-xs text-gray-500 leading-[40px]">{title}</span>
        <IoIosArrowDown />
      </div>

      {type === 'checkbox' && <div className="bg-white z-10 absolute top-[110%] border left-0">
        <div className="px-5 leading-[45px] py-[15px] flex items-center justify-between border">
            <div className="flex items-center gap-2">
                <span>0</span>
                <span>Selected</span>
            </div>
            <div className="underline ml-[200px]">Reset</div>
        </div>

        <div>
            Checkbox
        </div>
      </div>}

    </div>
  );
};

export default SelectProduct;
