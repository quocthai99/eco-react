import React from "react";
import { formatMoney, renderStartFromNumber } from "../ultils/helpers";

const CardFeature = ({ product }) => {
  return (
    <div className="border p-[15px]">
      <div className="flex items-center gap-5">
        <div className="w-[100px] h-[100px]">
          <img
            src={product.thumb}
            alt="thumb"
            className="w-[85] h-[85px] object-contain"
          />
        </div>
        <div className="flex flex-col items-start gap-1 text-sm">
          <span className="line-clamp-1 capitalize text-sm">
            {product.title?.toLowerCase()}
          </span>
          <span className="flex h-4">
            {renderStartFromNumber(product.totalRatings, 14)}
          </span>
          <span>{`${formatMoney(product.price)} VND`}</span>
        </div>
      </div>
    </div>
  );
};

export default CardFeature;
