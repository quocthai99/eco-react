import React, { useState, useEffect } from "react";

import { colors } from "../ultils/constant";
import { useDebounce } from "../hook";

import { icons } from "../ultils/icons";
import { useNavigate, createSearchParams } from "react-router-dom";

const { IoIosArrowDown } = icons;

const SelectProduct = ({
  title,
  type,
  fullW,
  onToggleInput,
  inputName,
  colorValue,
  setColorValue,
}) => {
  // const [colorValue, setColorValue] = useState([])
  const navigate = useNavigate()
  const [price, setPrice] = useState({
    from: '',
    to: ''
  })

  const handleSelectColor = (color) => {
    setColorValue((prev) => {
      const isChecked = colorValue.includes(color);
      if (isChecked) {
        return colorValue.filter((item) => item !== color);
      } else {
        return [...prev, color];
      }
    });
  };

  const debouncePriceFrom = useDebounce(price.from, 1000)
  const debouncePriceTo = useDebounce(price.to, 1000)

  useEffect(() => {
    const queryPrice = {}

    if (price.from > 0 ) queryPrice.from = price.from
    if (price.to > 0 ) queryPrice.to = price.to

    navigate({
      pathname: '',
      search: createSearchParams(queryPrice).toString()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncePriceFrom, debouncePriceTo])

  return (
    <div
      onClick={() => onToggleInput(title)}
      className={`relative border h-[45px] hover:outline hover:outline-2 cursor-pointer ${
        fullW ? "w-full" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-5 px-5 ">
        <span className="text-xs text-gray-500 leading-[40px]">{title}</span>
        <IoIosArrowDown />
      </div>

      {inputName === title && (
        <div>
          {type === "checkbox" && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white z-10 absolute top-[110%] border left-0"
            >
              <div className="px-5 leading-[45px] py-[15px] flex items-center justify-between border">
                <div className="flex items-center gap-2">
                  <span>{colorValue.length}</span>
                  <span>Selected</span>
                </div>
                <div onClick={() => setColorValue([])} className="underline ml-[200px] hover:text-main">Reset</div>
              </div>

              <div className="px-5 py-[5px]">
                {colors.map((el) => (
                  <div
                    key={el.id}
                    className="flex items-center gap-5 px-5 text-lg"
                  >
                    <input
                      type={type}
                      checked={colorValue.includes(el.color)}
                      onChange={() => handleSelectColor(el.color)}
                    />
                    <span>{el.color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {type === "input" && (
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white z-10 absolute top-[110%] border left-0"
            >
              <div className="px-5 leading-[45px] py-[15px] flex items-center justify-between border">
                <div className="flex items-center gap-2">
                  <span>0</span>
                  <span>Selected</span>
                </div>
                <div className="underline ml-[200px] hover:text-main">Reset</div>
              </div>

              <div className="flex items-center p-2 gap-2">
                <div className="flex items-center gap-2">
                  <label>From</label>
                  <input
                    value={price.from}
                    onChange={e => setPrice(prev => ({...prev, from: e.target.value}))}
                    type="number"
                    className="border appearance-none bg-white px-3 py-2"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label>To</label>
                  <input
                    value={price.to}
                    onChange={e => setPrice(prev => ({...prev, to: e.target.value}))}
                    type="number"
                    className="border appearance-none bg-white px-3 py-2"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectProduct;
