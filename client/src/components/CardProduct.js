import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify'
import Swal from "sweetalert2";
import { formatMoney, renderStartFromNumber } from "../ultils/helpers";

import { QuickView, SectionOption } from "../components";
import { icons } from "../ultils/icons";
import { path } from "../ultils/path";
import { useDispatch, useSelector } from "react-redux";
import { displayVoteSuccess } from "../redux/app/appSlice";
import { apiUpdateCart } from "../services/user";
import { getCurrentSuccess } from "../redux/user/userSlice";

const { BsCartPlus, BsCartCheck, AiFillEye, AiOutlineMenu, BsFillSuitHeartFill } = icons;

const CardProduct = ({ product, noPadding }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.user.getCurrent)
  const [isShowOption, setIsShowOption] = useState(false)

  const handleOptions = async (e, flag) => {
    e.stopPropagation()

    switch (flag) {
      case 'WISHLIST':
        console.log('wishlist')
        break;
        
      case 'ADDTOCART':
        if(!user) return Swal.fire({
          title: 'Almost...',
          text: 'Please login first!',
          icon: 'info',
          cancelButtonText: 'Not now!',
          showCancelButton: true,
          confirmButtonText: 'Go login page'
        }).then(rs => {
          if(rs.isConfirmed) navigate(`${path.LOGIN}`)
        })

        const response = await apiUpdateCart({pid: product?._id, color: product?.color, quantity: product?.quantity})
        if(response.data.success) {
          dispatch(getCurrentSuccess(response.data.updatedCart))
          toast.success(response.data.mes)
        }
        break;

      case 'QUICKVIEW':
        dispatch(displayVoteSuccess({showModal: true, modalChildren: <QuickView product={product} />}))
        break;
    
      default:
        break;
    }
  }
  return (
    <div
      onClick={() => navigate(`/${path.PRODUCTS}/${product.category.toLowerCase()}/${product.title}/${product._id}`)}
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
              <div onClick={(e) => handleOptions(e, 'WISHLIST')}>
                <SectionOption icon={<BsFillSuitHeartFill />} />
              </div>
              {user?.cart.some(el => el.product === product._id) 
                ? <div>
                    <SectionOption icon={<BsCartCheck color='green' />}  />
                  </div>
                : <div onClick={(e) => handleOptions(e, 'ADDTOCART')}>
                    <SectionOption icon={<BsCartPlus />}  />
                  </div>
              }
              <div onClick={(e) => handleOptions(e, 'QUICKVIEW')}>
                <SectionOption icon={<AiFillEye />} />
              </div>
            </div>}
          </div>

          <div className="flex flex-col items-center justify-center gap-5" >
            <span className='flex h-4' >{renderStartFromNumber(product.totalRatings)}</span>
            <span className='line-clamp-1'>{product.title}</span>
            <span>{`${formatMoney(product.price)} VND`}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CardProduct;
