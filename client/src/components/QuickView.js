import React, { useState } from 'react'
import { formatMoney } from '../ultils/helpers'
import Button from './Button'

const QuickView = ({product}) => {
    const [quantity, setQuantity] = useState(null)

    const handleQuantity = (e,key) => {
        e.stopPropagation()
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
    return (
        <div onClick={e => e.stopPropagation()} className='bg-white max-w-[800px] p-5'>
                <div className='grid grid-cols-2 gap-5'>

                    <div className='flex flex-col gap-5'>
                        <img src={product?.thumb} alt='thumb' className='w-[360px] h-[360px] object-cover border' />
                        <div className='flex items-center justify-around border'>
                            {product?.images.slice(0,3).map(img => (
                                <img src={img} alt='img' className='w-24 h-24 object-contain' />
                            ))}
                        </div>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <h2 className='font-semibold text-xl'>{product?.title}</h2>

                        <div className='flex flex-col gap-2'>
                            <ul className='text-sm text-[#505050]'>
                                {product?.description.map(des => (
                                    <li>{des}</li>
                                ))}
                            </ul>
                            <div className='font-semibold text-xl'>{`${formatMoney(product?.price)} VND`}</div>
                        </div>

                        <div className="flex items-center gap-4 my-4" >
                            <span className="font-semibold">Quantity</span>
                            <div className='flex items-center' >
                                <span onClick={(e) => handleQuantity(e, 'minus')} className='border-r cursor-pointer border-gray-500 p-2'>-</span>
                                <input
                                    onChange={e => e.target.value}
                                    value={quantity || 1}
                                    type='text'
                                    className='text-center py-2 outline-none w-[50px] text-black '
                                />
                                <span onClick={(e) => handleQuantity(e, 'plus')} className='border-l cursor-pointer border-gray-500 p-2'>+</span>
                            </div>
                        </div>
                        
                        <Button title="ADD TO CART" />
                    </div>

                </div>            
        </div>
    )
}

export default QuickView