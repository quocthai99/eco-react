import React, { useState } from "react";
import { Link } from "react-router-dom";
import { formatMoney, renderStartFromNumber } from "../ultils/helpers";

import { SectionOption } from "../components";
import { icons } from "../ultils/icons";
import { path } from "../ultils/path";

const { AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons;

const CardProduct = ({ product, noPadding }) => {
  const [isShowOption, setIsShowOption] = useState(false)
  return (
    <Link
      to={`/${path.PRODUCTS}/${product.category.toLowerCase()}/${product.title}/${product._id}`}
      className="w-full"
      onMouseEnter={e => {
        e.stopPropagation()
        setIsShowOption(true)
      }}
      onMouseLeave={e => {
        e.stopPropagation()
        setIsShowOption(false)
      }}
    >
      <div className={`${noPadding ? '' : 'pr-5'}`}>
        
        <div className="p-[15px] border">
          <div className="mb-5 relative">
            <img src={product.thumb} alt="thumb" />
            {isShowOption && <div className="absolute bottom-0 left-[50%] translate-x-[-50%] flex gap-2" >
              <SectionOption icon={<BsFillSuitHeartFill />} />
              <SectionOption icon={<AiOutlineMenu />} />
              <SectionOption icon={<AiFillEye />} />
            </div>}
          </div>

          <div className="flex flex-col items-center justify-center gap-5" >
            <span className='flex h-4' >{renderStartFromNumber(product.totalRatings)}</span>
            <span className='line-clamp-1'>{product.title}</span>
            <span>{`${formatMoney(product.price)} VND`}</span>
          </div>
        </div>

      </div>
    </Link>
  );
};

export default CardProduct;
