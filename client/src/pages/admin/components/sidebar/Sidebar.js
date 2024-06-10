import React, { Fragment, useState } from 'react'
import logo from '../../../../assets/logo.png'
import { adminSidebar } from '../../../../ultils/constant'
import { NavLink } from 'react-router-dom'
import { AiOutlineCaretDown } from 'react-icons/ai'

const activedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 font-bold bg-sky-500'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 font-bold hover:bg-sky-500'

const Sidebar = () => {
    const [active, setActive] = useState(false)

  return (
    <div className='bg-sky-800 h-full py-4'>
        <div className='flex flex-col justify-center items-center p-4 gap-2'>
            <img src={logo} alt='logo' className='w-[200px] object-contain ' />
            <small>Admin Workpace</small>
        </div>

        <div>
            {adminSidebar.map(el => (
                <Fragment key={el.id}>
                    {el.type === 'single' && 
                        <NavLink 
                            to={el.path}
                            className={({isActive}) => isActive ? activedStyle : notActivedStyle }
                        >
                            <span>{el.icon}</span>
                            <span>{el.text}</span>
                        </NavLink>}

                    {el.type === 'parent' && 
                        <div onClick={() => setActive(!active)} className=' flex flex-col text-gray-200 font-bold'>
                            <div className='flex items-center justify-between px-4 py-2 hover:bg-sky-500 cursor-pointer'>
                                <div className='flex items-center gap-2'>
                                    <span>{el.icon}</span>
                                    <span>{el.text}</span>
                                </div>
                                <AiOutlineCaretDown />
                            </div>

                            {active && <div className='flex flex-col'>
                                {el.subMenu.map((item, i) => (
                                    <NavLink 
                                        onClick={e => e.stopPropagation()}
                                        key={i} 
                                        to={item.path}
                                        className={({isActive}) => isActive ? activedStyle : notActivedStyle }
                                    >
                                        {item.text}
                                    </NavLink>
                                ))}
                            </div>}
                        </div>}
                </Fragment>
            ))}
        </div>
    </div>
  )
}

export default Sidebar