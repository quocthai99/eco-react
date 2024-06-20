import React, { useEffect, useState } from "react";

import { Sidebar, Banner, DealDaily, BestSeller, Feature, SimpleSlider } from "../../components";
import { apiGetProducts } from "../../services/product";
import { useSelector } from "react-redux";

import {icons } from '../../ultils/icons'

const { IoIosArrowForward } = icons

const tabs = [
  {id: 1, name: 'Laptop'},
  {id: 2, name: 'Tablet'},
  {id: 3, name: 'Smartphone'},
]

const Home = () => {
  const [products, setProducts] = useState(null)
  const [activeTab, setActiveTab] = useState(1)

  const { categories } = useSelector(state => state.category.getCategories)

  const fetchProducts = async(name) => {
    const response = await apiGetProducts({category: name || 'laptop'})
    if (response?.data.success) {
      setProducts(response.data.products)
    }
}

  useEffect(() => {
    fetchProducts()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTabs = (id, name) => {
    setActiveTab(id)
    fetchProducts(name)
  }

  return (
    <div className="max-w-mainWidth m-auto mt-5">
      <div className="flex mb-[30px]">
        <Sidebar />
        <Banner />
      </div>

      <div className="flex mb-[30px]">
        <DealDaily />
        <BestSeller />
      </div>

      <Feature />
      
      <div className="mt-[30px]" >
        <header className="mb-5 flex justify-between border-b-2 border-main">
          <h2 className="uppercase py-[15px] font-bold text-xl">
            featured products
          </h2>

          <ul className="flex items-center justify-center gap-5" >
            {tabs.map(tab => (
              <li 
                onClick={() => handleTabs(tab.id, tab.name)}
                key={tab.id} 
                className={`hover:text-main cursor-pointer ${activeTab === tab.id ? 'text-main' : ''}`}
                >
                  {tab.name}
              </li>
            ))}
          </ul>
        </header>

        <div className='my-10 w-full' >
          <SimpleSlider 
            products={products}
          />
        </div>
      </div>

      <div className="mb-[30px]" >
        <header className="mb-5">
          <h2 className="uppercase py-[15px] border-b-2 border-main font-bold text-xl">
            hot collections
          </h2>
        </header>

        <div className="grid grid-cols-3 gap-5" >
          {categories?.filter(item => item.brand.length > 0 ).map(cate => (
            <div key={cate._id} className="flex items-center gap-5 border" >
              <div className="pl-10 pb-5" >
                <img
                  src={cate.image}
                  alt="collections"
                />
              </div>

              <div className="flex flex-col p-[15px] gap-[10px] pb-10" >
                <h2 className="font-semibold uppercase text-sm">{cate.title}</h2>
                <ul className="text-sm text-gray-500 font-normal" >
                  {cate.brand.map(el => (
                    <div key={el} className="flex items-center gap-2 cursor-pointer hover:text-main" >
                      <IoIosArrowForward />
                      <li>{el}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
            ))
          }
        </div>
        

      </div>
    </div>
  );
};

export default Home;
