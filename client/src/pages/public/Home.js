import React, { useEffect, useState } from "react";

import { Sidebar, Banner, DealDaily, BestSeller, Feature, SimpleSlider } from "../../components";
import { apiGetProducts } from "../../services/product";

const tabs = [
  {id: 1, name: 'Laptop'},
  {id: 2, name: 'Tablet'},
  {id: 3, name: 'Smartphone'},
]

const Home = () => {
  const [products, setProducts] = useState(null)
  const [activeTab, setActiveTab] = useState(1)

  const fetchProducts = async(name) => {
    const response = await apiGetProducts({category: name || 'laptop'})
    if (response?.data.success) {
      setProducts(response.data.products)
    }
  }
  useEffect(() => {
    fetchProducts()
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
    </div>
  );
};

export default Home;
