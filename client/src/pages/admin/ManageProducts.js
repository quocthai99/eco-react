import React, { useState, useEffect } from 'react'
import { apiDeleteProduct, apiGetProducts } from '../../services/product'
import { formatMoney } from '../../ultils/helpers'
import { useDebounce } from '../../hook'
import { Pagination } from '../../components'
import UpdateProduct from './UpdateProduct'

const ManageProducts = () => {
  const [products, setProducts] = useState(null)
  const [counts, setCounts] = useState(0)
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [isEdit, setIsEdit] = useState(null)

  const fetchGetProducts = async (params) => {
    const response = await apiGetProducts(params)
    if(response.data.success) {
      setProducts(response.data.products)
      setCounts(response.data.counts)
    }
  }

  const queryDebounce = useDebounce(query, 1000)
  
  useEffect(() => {
    const queries = {}
    if (currentPage) queries.page = currentPage
    if(queryDebounce) queries.queryFields = queryDebounce
    
    fetchGetProducts(queries)
  }, [currentPage, queryDebounce, isEdit])

  const handleDeleteProduct = async(pid) => {
    await apiDeleteProduct(pid)
  }

  return (
    <div className='relative'>
      {isEdit && <UpdateProduct product={isEdit} setIsEdit={setIsEdit} />}
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b ">
          <span>Manage Product</span>
      </h1>

      <div className="w-full pr-5">
        <div className="flex justify-end py-4 ">
            <input 
              type="text"
              className="py-2 px-[10px] min-w-[500px] bg-inputField font-light rounded-sm outline-none mb-4 text-[#1c1d1d] placeholder:text-[#1c1d1d"
              placeholder='Search username'
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </div>

          <form>
            <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <th className="px-6 py-3 text-center">#</th>
                    <th className="px-6 py-3 text-center">Thumb</th>
                    <th className="px-6 py-3 text-center">Title</th>
                    <th className="px-6 py-3 text-center">Brand</th>
                    <th className="px-6 py-3 text-center">Category</th>
                    <th className="px-6 py-3 text-center">Price</th>
                    <th className="px-6 py-3 text-center">Quantity</th>
                    <th className="px-6 py-3 text-center">Sold</th>
                    <th className="px-6 py-3 text-center">Color</th>
                    <th className="px-6 py-3 text-center">Ratings</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {products && products.map((product, i) => (
                    <tr key={product._id} className="text-white text-xs text-center border">
                      <td>{i + 1}</td>
                      <td className='px-6'>
                        <img src={product.thumb} alt='thumb' className='w-10 h-10 object-cover' />
                      </td>
                      <td>{product.title}</td>
                      <td>{product.brand}</td>
                      <td>{product.category}</td>
                      <td>{formatMoney(product.price)}</td>
                      <td>{product.quantity}</td>
                      <td>{product.sold}</td>
                      <td>{product.color}</td>
                      <td>{product.totalRatings}</td>
                      <td className="flex flex-col gap-2">
                        <div onClick={() => setIsEdit(product)} className='hover:text-main cursor-pointer'>Edit</div>
                        <div className='hover:text-main cursor-pointer'>Variants</div>
                        <div className='hover:text-main cursor-pointer' onClick={() => handleDeleteProduct(product._id)}>Delete</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
          </form>
      </div>

      <div className='mt-10'>
        <Pagination
          totalCount={counts}
          currentPage={currentPage}
          onPageChange={page => setCurrentPage(page)}
        />
      </div>

    </div>
  )
}

export default ManageProducts