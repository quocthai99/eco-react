import React, { useState, useEffect } from 'react'

import SimpleSlider from './SimpleSlider'
import { apiGetProducts } from '../services/product'


const tabs = [
  {id: 1, name: 'best seller'},
  {id: 2, name: 'new arrivals'},
]

const BestSeller = () => {
  const [bestSeller, setBestSeller] = useState(null)
  const [dealHot, setDealHot] = useState(null)
  const [products, setProducts] = useState(null)
  const [activeTab, setActiveTab] = useState(1)
  
  useEffect(() => {
    const fetchProducts = async() => {
      const response = await Promise.all([apiGetProducts({sort: '-sold'}), apiGetProducts({sort: '-price'})])
      if ( response.length > 0 ) {
        setBestSeller(response[0].data.products)
        setDealHot(response[1].data.products)
      } 
    }

    fetchProducts()
  }, [])
  
  useEffect(() => {
      if ( activeTab === 1 ) setProducts(bestSeller)
      if ( activeTab === 2 ) setProducts(dealHot)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, bestSeller, dealHot])
  
  return (
    <div className='pl-5 w-3/4 min-h-[650px]'>
        <div className='w-full' >

            <div className='pb-[15px] mb-5 border-b border-main '>
              <ul className='uppercase flex gap-5'>
                {tabs.map(tab => (
                  <li 
                    onClick={() => setActiveTab(tab.id)}
                    key={tab.id} 
                    className={`inline-block text-[22px] font-semibold cursor-pointer last:pl-5 last:border-l last:border-l-gray-500 ${activeTab === tab.id ? '' : 'text-gray-500'}`}
                  >
                      {tab.name}
                  </li>
                ))}
              </ul>
            </div>

            <div className='my-10 w-full' >
                <SimpleSlider 
                  products={products}
                />
            </div>

            <div className='flex gap-5'>
              <img 
                className='flex-1'
                src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
                alt='banner-1'
              />
              <img 
                className='flex-1'
                src='https://digital-world-2.myshopify.com/cdn/shop/files/banner1-home2_2000x_crop_center.png?v=1613166657'
                alt='banner-1'
              />
            </div>
        </div>
    </div>
  )
}

export default BestSeller