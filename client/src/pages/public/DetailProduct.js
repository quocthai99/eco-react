import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import DOMPurify from 'dompurify';

import { apiDetailProduct, apiGetProducts } from "../../services/product";
import { formatMoney } from "../../ultils/helpers";
import { Breadcrumbs, Button, Comment, ExtraInfo, SimpleSlider, Vote, Votebar } from "../../components";
import { path } from "../../ultils/path";
import { displayVoteSuccess } from "../../redux/app/appSlice";


import { icons } from "../../ultils/icons";

const { FaShieldAlt, FaTruck, FaGift, FaReply, FaTty, FaChevronLeft, AiFillStar } = icons

const DetailProduct = () => {
  const dispatch = useDispatch()
  const { id, category } = useParams();
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState(null)
  const [quantity, setQuantity] = useState(null)
  const { showModal } = useSelector(state => state.app.displayModalVote)

  const fetchDetailProduct = async () => {
    const response = await apiDetailProduct(id);
    if (response?.data.success) {
      setProduct(response.data.product);
    }
  };

  const fetchProducts = async (category) => {
    const response = await apiGetProducts({category});
    if (response?.data.success) {
      setProducts(response.data.products);
    }
  };
  
  useEffect(() => {
    fetchDetailProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, showModal]);

  useEffect(() => {
    fetchProducts(category)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  const handleQuantity = (key) => {
    if (key === 'minus') {
      setQuantity(quantity - 1)
      if (quantity < 1 ) {
        setQuantity(1)
      }
      
    }
    if ( key === 'plus') {
      setQuantity(quantity + 1)
    }
  }

  const handleAddToCart = () => {
    console.log(quantity)
  }

  const handleShowModal = () => {
    dispatch(displayVoteSuccess({showModal: true, modalChildren: <Vote pid={id} />}))
  }

  return (
    <div>
    {/* Breadcrum */}
      <div className="w-full bg-[#F7F7F7] min-h-[80px]">
        <div className="max-w-mainWidth m-auto py-[10px]">
          <div className="mb-[10px] font-bold text-lg" >
            <span>{product?.title}</span>
          </div>
          <Breadcrumbs />
        </div>
      </div>

      {/* Detail */}
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
                  {product?.description.length > 1 && product?.description.map((el, i) =>  <li key={i}>{el}</li> )}
                  {product?.description.length === 1 && <div className="line-clamp-[10]" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product?.description[0])}} ></div>}
                </ul>

                <div className="flex items-center gap-4 my-4" >
                  <span className="font-semibold">Quantity</span>
                  <div className='flex items-center' >
                    <span onClick={() => handleQuantity('minus')} className='border-r cursor-pointer border-gray-500 p-2'>-</span>
                    <input
                        onChange={e => e.target.value}
                        value={quantity || 1}
                        type='text'
                        className='text-center py-2 outline-none w-[50px] text-black '
                    />
                    <span onClick={() => handleQuantity('plus')} className='border-l cursor-pointer border-gray-500 p-2'>+</span>
                  </div>
                </div>

                <Button onClick={handleAddToCart} title="ADD TO CART"/>
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
      
      {/* Back to home */}
      <Link to={`/${path.HOME}`} className="flex items-center justify-center text-[#505050] hover:text-main mb-[30px]" >
        <FaChevronLeft />
        <span className="text-sm">BACK TO COLLECTION - FULL WIDTH</span>
      </Link>

      {/* Vote */}
      <div className="max-w-mainWidth m-auto mt-5">
          <div className="p-5 border">
            <h2 className="font-bold mb-5">Đánh giá & nhận xé</h2>
            
            <div className="grid grid-cols-5 pb-10 mb-5 border-b">

              <div className="col-span-2">
                <div className="py-10">
                  <div className="text-center text-2xl font-bold mb-2">{`${product?.totalRatings}/5`}</div>
                  <div className="flex justify-center gap-2">
                    {Array.from(Array(5).keys().map(item => (
                      <AiFillStar key={item} color="orange" />
                    )))}
                  </div>
                  <div className="text-center underline text-blue-500 mt-2">{`${product?.ratings.length} đánh giá`}</div>
                </div>
              </div>

              <div className="border-l pl-10 col-span-3">
                <div className="pb-10">
                    {Array.from(Array(5).keys()).reverse().map(el => (
                      <Votebar 
                        key={el}
                        star={el + 1}
                        totalRatings={product?.ratings.length}
                        totalCount={product?.ratings.filter((i) => i.star === el + 1)?.length}
                      />
                    ))}
                </div>
              </div>
            </div>

            <div className="pb-10 mb-5 border-b">
              <div className="text-center flex flex-col gap-5">
                <div className=" text-gray-700">Bạn đánh giá sao về sản phẩm này?</div>
                <div className="flex items-center justify-center">
                  <Button
                    title="Rating now"
                    cusWidth="max-w-[170px]"
                    onClick={handleShowModal}
                  />
                </div>
              </div>
            </div>

            <div>
              {product?.ratings.map(el => (
                <Comment key={el._id} star={el.star} comment={el.comment} />
              ))}
            </div>
            
          </div>
      </div>

      {/* Slide */}
      <div className="max-w-mainWidth m-auto my-5 ">
        <h2 className="uppercase py-[15px] font-bold text-xl border-b-2 border-main mb-10">
          OTHER CUSTOMERS ALSO BUY:
        </h2>
        <SimpleSlider 
          products={products}
        />
      </div>
    </div>
  );
};

export default DetailProduct;
