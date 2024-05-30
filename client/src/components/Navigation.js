import React from 'react'
import { NavLink } from 'react-router-dom'

import {navigation} from '../ultils/constant'
const Navigation = () => {
  return (
    <nav className='container max-w-mainWidth h-[50px] py-2 border-y border-gray-400 m-auto flex items-center justify-between' >
      <div className='nav__menu' >
        <div className='nav__list' >
          <div className='nav__item' >
            {navigation.map(el => (
              <NavLink key={el.id} to={el.path} className={({isActive}) => isActive ? 'text-main text-sm pr-[30px]' : 'pr-[30px] text-sm hover:text-main'} >
                {el.value}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
      <div>
        <input type='text' placeholder='Search product' className='outline-none' />
      </div>
    </nav>
  )
}

export default Navigation