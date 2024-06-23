import React, { Fragment, useState } from 'react'
import avatar from '../../../../assets/avatar.png'
import { memberSidebar } from '../../../../ultils/constant'
import { NavLink } from 'react-router-dom'
import { AiOutlineCaretDown } from 'react-icons/ai'
import { useSelector } from 'react-redux'

const activedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 font-bold bg-sky-500'
const notActivedStyle = 'px-4 py-2 flex items-center gap-2 text-gray-200 font-bold hover:bg-sky-500'

const MemberSidebar = () => {
    const [active, setActive] = useState(false)
    const { user } = useSelector(state => state.user.getCurrent)
    console.log(user)

  return (
    <div className='bg-sky-800 h-full py-4'>
        <div className='flex flex-col justify-center items-center p-4 gap-2'>
            <img src={ user?.avatar || avatar} alt='logo' className='w-20 object-contain ' />
            <small>{`${user?.firstname} ${user?.lastname}`}</small>
        </div>

        <div>
            {memberSidebar.map(el => (
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

export default MemberSidebar