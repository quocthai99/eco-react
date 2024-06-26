import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { showCart } from "../redux/app/appSlice";
import { formatMoney } from "../ultils/helpers";
import Button from "./Button";
import { apiRemoveCart } from "../services/user";
import { toast } from "react-toastify";

const ModalCart = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user.getCurrent)
    const [quantity, setQuantity] = useState(1)
    console.log(user)

    const handleDeleteCart = async(id) => {
        const response = await apiRemoveCart(id)
        if(response.data.success) {
            toast.success(response.data.mes)
        }
    }
    
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className="w-[500px] h-screen bg-black text-white p-5 grid grid-rows-10 "
        >
            <header className="flex items-center row-span-1 h-full justify-between py-5 border-b border-gray-700 font-bold text-2xl">
                <h2>Your Cart</h2>
                <div onClick={() => dispatch(showCart())} className="cursor-pointer">
                    <AiFillCloseCircle size={24} />
                </div>
            </header>

            <section className="row-span-7 mt-5 h-full overflow-y-auto">
                {!user?.cart && <span>Your cart is empty</span>}
                {user?.cart && user.cart.map(el => (
                    <div  key={el._id} className="grid grid-cols-6 gap-10 mt-5 ">
                        <div className="flex gap-5 col-span-3 ">
                            <img src={el.product.thumb} alt="thumb" className="w-20 object-cover" />
                            <div className="flex flex-col gap-5">
                                <h4>{el.product.title}</h4>
                                <div>
                                    <span className='border cursor-pointer border-gray-700 px-2 text-sm'>-</span>
                                    <input
                                        onChange={e => e.target.value}
                                        value={quantity || 1}
                                        type='text'
                                        className='text-center outline-none w-8 text-sm bg-black text-white border border-gray-700 '
                                    />
                                    <span className='border cursor-pointer border-gray-700 px-2 text-sm'>+</span>
                                </div>
                            </div>
                        </div>

                        <div className="my-auto col-span-2">
                            {`${formatMoney(el.product.price)} VND`}
                        </div>

                        <span onClick={() => handleDeleteCart(el.product._id) } className="border-gray-700 px-2 my-auto col-span-1 text-center rounded-full cursor-pointer">
                            <AiFillCloseCircle size={20} />
                        </span>
                    </div>
                ))}
            </section>

            <div className="row-span-2 h-full border-t border-gray-700 pt-5 flex flex-col gap-5">
                <div className="font-semibold text-lg flex justify-between items-center">
                    <h4>SUBTOTAL</h4>
                    <span>
                        {user && `${formatMoney(user.cart.reduce((acc, el) => acc + el.product.price, 0 ))} VND`}
                    </span>
                </div>

                <div className="text-sm italic text-gray-300">Shipping, taxes, and discounts calculated at checkout.</div>

                <Button title="SHOPPING CART" />
            </div>
        </div>
    );
};

export default ModalCart;
