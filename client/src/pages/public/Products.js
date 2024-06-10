import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { apiGetProducts } from "../../services/product";
import { useParams } from "react-router-dom";

import { CardProduct, Pagination, SelectProduct } from '../../components'

import { icons } from "../../ultils/icons";
import { colors } from "../../ultils/constant";

const { IoIosArrowDown } = icons;

const Products = () => {
  const params = useParams()
  const [products, setProducts] = useState(null)
  const [activeSelect, setActiveSelect] = useState(false)
  const [checked, setChecked] = useState([])

  const fetchProducts = async (category) => {
    const response = await apiGetProducts({category})
    if (response?.data.success) setProducts(response.data.products)
  }

  useEffect(() => {
    fetchProducts(params.category)
  }, [params])

  const handleChecked = (id) => {
    setChecked(prev => {
      const isChecked = checked.includes(id)
      if (isChecked) {
        // Uncheck
        return checked.filter(item => item !== id)
      } else {
        return [...prev, id]
      }
    })
  }
  console.log(checked)
  return (
    <div className="pb-10">
      <div className="w-full bg-[#F7F7F7] min-h-[80px]">
        <div className="max-w-mainWidth m-auto py-[10px]">
          <div className="mb-[10px] font-bold text-lg">
            <span className="uppercase">{params.category ? params.category : 'ALL PRODUCTS'}</span>
          </div>

          <Breadcrumbs />
        </div>
      </div>

      <div className="max-w-mainWidth m-auto mt-5">
        <div>
          <div className="border mb-5 p-[10px] flex justify-between">
            <div className="flex flex-col gap-2 flex-2" >
              <span className="font-semibold text-sm">Filter by</span>
              <div className="flex items-center gap-[10px]">
                {/* <SelectProduct title="Color" type="checkbox" />
                <SelectProduct title="Price" /> */}
                <div onClick={() => setActiveSelect(!activeSelect)} className="relative border h-[45px] hover:outline hover:outline-2 cursor-pointer">
                  <div className="flex items-center justify-between gap-5 px-5 ">
                    <span className="text-xs text-gray-500 leading-[40px]">Color</span>
                    <IoIosArrowDown />
                  </div>

                  {activeSelect && <div onClick={e => e.stopPropagation()} className="bg-white z-10 absolute top-[110%] border left-0">
                    <div className="px-5 leading-[45px] py-[15px] flex items-center justify-between border">
                        <div className="flex items-center gap-2">
                            <span>0</span>
                            <span>Selected</span>
                        </div>
                        <div className="underline ml-[200px]">Reset</div>
                    </div>

                    <div className="px-5 py-[5px]">
                        {colors.map(el => (
                          <div key={el.id} className="flex items-center gap-5 px-5 text-lg">
                            <input 
                              type="checkbox"
                              checked={checked.includes(el.id)}
                              onChange={() => handleChecked(el.id)}
                            />
                            <span>{el.color}</span>
                          </div>
                        ))}
                    </div>
                  </div>}

                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <span className="font-semibold text-sm">Sort by</span>
              <div className="flex items-center gap-[10px]">
                <SelectProduct title="Sort" fullW />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-5" >
            {products?.map(product => (
              <CardProduct 
                key={product._id}
                product={product}
                noPadding
              />
            ))}
          </div>

          <div className="text-center pt-10">
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
