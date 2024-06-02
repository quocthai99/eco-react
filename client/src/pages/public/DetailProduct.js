import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiDetailProduct } from "../../services/product";
import { formatMoney } from "../../ultils/helpers";
import { Breadcrumbs, Button, ExtraInfo } from "../../components";
import { path } from "../../ultils/path";


import { icons } from "../../ultils/icons";

const { FaShieldAlt, FaTruck, FaGift, FaReply, FaTty, FaChevronLeft } = icons

const DetailProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const fetchDetailProduct = async () => {
    const response = await apiDetailProduct(id);
    if (response?.data.success) {
      setProduct(response.data.product);
    }
  };
  
  useEffect(() => {
    fetchDetailProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleQuantity = () => {
    console.log('run')
  }

  return (
    <div>
      <div className="w-full bg-[#F7F7F7] min-h-[80px]">
        <div className="max-w-mainWidth m-auto py-[10px]">
          <div className="mb-[10px] font-bold text-lg" >
            <span>{product?.title}</span>
          </div>
          <Breadcrumbs />
        </div>
      </div>

      <div className="max-w-mainWidth m-auto mt-5">

        <div className="flex gap-10 mb-[30px]" >
          <div className="flex flex-col gap-10" >
            <img 
              src={product?.images[0]}
              alt=""
              className="w-[457px] h-[457px] object-contain border p-4"
            />

            <div className="flex items-center justify-center gap-[10px]" >
              {product?.images.slice(0, 3).map((img, i) => (
                <img 
                  key={i}
                  src={img}
                  alt="img" 
                  className="w-[143px] h-[143px] object-contain border p-[10px]"
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3" >
            {/* LEFT */}
            <div className="flex flex-col items-start gap-5 col-span-2" >
              <h2 className="font-semibold text-3xl">{`${formatMoney(product?.price)} VND`}</h2>

              <div className="w-full">
                
                <ul className="flex flex-col gap-1 text-[#505050]">
                  {product?.description.map((el, i) => (
                    <li key={i}>{el}</li>
                  ))}
                </ul>

                <div className="flex items-center gap-4 my-4" >
                  <span className="font-semibold">Quantity</span>
                  <div className='flex items-center' >
                    <span className='border-r cursor-pointer border-gray-500 p-2'>-</span>
                    <input
                        onChange={handleQuantity}
                        value="1"
                        type='text'
                        className='text-center py-2 outline-none w-[50px] text-black '
                    />
                    <span className='border-l cursor-pointer border-gray-500 p-2'>+</span>
                  </div>
                </div>

                <Button title="ADD TO CART"/>
              </div>

            </div>

            {/* RIGHT */}
            <div className="flex flex-col items-center gap-[10px]">

              <ExtraInfo icon={<FaShieldAlt />} title="Guarantee" info="Quantity Checked" />
              <ExtraInfo icon={<FaTruck />} title="Free Shipping" info="Free On All Products" />
              <ExtraInfo icon={<FaGift />} title="Special Gift Cards" info="Special Gift Cards" />
              <ExtraInfo icon={<FaReply />} title="Free Return" info="Within 7 Days" />
              <ExtraInfo icon={<FaTty />} title="Consultancy" info="Lifetime 24/7/356" />

            </div>
          </div>

        </div>
      </div>

      <Link to={path.HOME} className="flex items-center justify-center text-[#505050] hover:text-main mb-[30px]" >
        <FaChevronLeft />
        <span className="text-sm">BACK TO COLLECTION - FULL WIDTH</span>
      </Link>
    </div>
  );
};

export default DetailProduct;
