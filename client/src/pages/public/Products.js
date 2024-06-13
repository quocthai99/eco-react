import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { apiGetProducts } from "../../services/product";
import { useNavigate, useParams, useSearchParams, createSearchParams } from "react-router-dom";
import { useDebounce } from "../../hook";
import { CardProduct, InputSort, Pagination, SelectProduct } from '../../components'
import { sorts } from "../../ultils/constant";


const Products = () => {
  const navigate = useNavigate()

  const {category} = useParams()
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [inputName, setInputName] = useState(null)
  const [colorValue, setColorValue] = useState([])
  const [sort, setSort] = useState('')
  const [ params ] = useSearchParams()
  
  const fetchProducts = async (queries) => {
    const response = await apiGetProducts(queries)
    if (response?.data.success) {
      setProducts(response.data.products)
      setCounts(response.data.counts)
    }
  }

  const debounceColor = useDebounce(colorValue, 1000)

  
  useEffect(() => {
    const param = Object.fromEntries([...params])
    let priceQuery = {}
    if(param.from && param.to) {
      priceQuery = {
        $and: [{ price: { gte: param.from } }, { price: { lte: param.to } }],
      };
      delete param.price;
    }
    if(param.from) param.price = { gte: param.from }
    if(param.to) param.price = { lte: param.to }

    delete param.from
    delete param.to
    
    // output: price: { glt: 1000 }
    const queries = {...param,...priceQuery, category}
    fetchProducts(queries)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params])

  useEffect(() => {

    navigate({
      pathname: '',
      search: createSearchParams({
        color: colorValue,
        page: currentPage,
      }).toString()
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceColor, currentPage])
  
  const handleToggleInput = (nameInput) => {
    if (inputName === nameInput) {
      setInputName(null)
    } else {
      setInputName(nameInput)
    }
  }

  const changeValue = (value) => {
    setSort(value)
  }

  useEffect(() => {
    if (sort) {
        navigate({
            pathname: '',
            search: createSearchParams({
                sort
            }).toString()
        })
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
}, [sort])
  
  return (
    <div className="pb-10">
      <div className="w-full bg-[#F7F7F7] min-h-[80px]">
        <div className="max-w-mainWidth m-auto py-[10px]">
          <div className="mb-[10px] font-bold text-lg">
            <span className="uppercase">{category ? category : 'ALL PRODUCTS'}</span>
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
                <SelectProduct
                  title="Price"
                  type="input"
                  inputName={inputName}
                  onToggleInput={handleToggleInput}
                />
                <SelectProduct
                  title="Color"
                  type="checkbox"
                  inputName={inputName}
                  colorValue={colorValue}
                  setColorValue={setColorValue}
                  onToggleInput={handleToggleInput}
                />
              </div>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <span className="font-semibold text-sm">Sort by</span>
              <div className="flex items-center gap-[10px]">
                <InputSort 
                options={sorts}
                value={sort.value}
                changeValue={changeValue}
                />
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
            <Pagination 
              totalCount={counts}
              currentPage={currentPage}
              onPageChange={page => setCurrentPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
