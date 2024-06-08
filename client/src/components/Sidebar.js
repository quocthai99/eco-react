import React from 'react'

import {icons} from '../ultils/icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { path } from '../ultils/path'


const { IoMdMenu } = icons

const Sidebar = () => {
  const { categories } = useSelector(state => state.category.getCategories)
  
  return (
    <div className='w-1/4 h-[500px] border' >
      <div>
        <div className='bg-main text-white px-5 py-[10px] flex items-center gap-2' >
          <IoMdMenu size={24} />
          <span className='uppercase font-semibold'>all collections</span>
        </div>
        <div className='text-textColor' >
          {categories?.map((cate) => (
            <Link to={`${path.PRODUCTS}/${cate.title.toLowerCase()}`} key={cate._id} className='px-5 py-4 flex items-center gap-3'>
              <img src={cate.icon} alt='icons' className='w-5 h-5 object-cover' />
              <span className=' hover:text-main cursor-pointer'>
                {cate.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Sidebar