import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import { icons } from '../ultils/icons'
import logo from '../assets/logo.png'
import { logoutFailed, logoutStart, logoutSuccess } from '../redux/user/userSlice'
import { apiLogout } from '../services/user'


const { AiOutlineLogout, CiMoneyBill, FaAngleDown, FaPinterest, FaFacebookF, FaTwitter, FaInstagram, FaGoogle, FaPhoneAlt, FaShoppingCart, MdEmail, CiHeart } = icons

const Header = () => {
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user.login)
    
    const handleLogout = async () => {
        
        try {
            dispatch(logoutStart())
            await apiLogout()
            dispatch(logoutSuccess())
        } catch (error) {
            dispatch(logoutFailed())
        }
    }
    
    return (
        <header className='header'>
            <div className='header__top bg-main py-2 text-white' >
                <div className='header__container container max-w-mainWidth m-auto flex items-center justify-between'>
                    <div className='flex items-center gap-2' >
                        <span className='text-xs pr-2 border-r border-gray-100' >ORDER ONLINE OR CALL US (+1800) 000 8808</span>
                        <div className='flex items-center' >
                            <CiMoneyBill />
                            <div className='flex items-center text-xs' >
                                <span className='px-1'>VND</span>
                                <FaAngleDown />
                            </div>
                        </div>
                    </div>
                    {currentUser 
                        ? <div className='flex items-center gap-4' >
                            <span>Wellcome</span>
                            <div className='flex items-center gap-1' >
                                <span>{currentUser.firstname}</span>
                                <span>{currentUser.lastname}</span>
                                <span onClick={handleLogout} >
                                    <AiOutlineLogout size={20} />
                                </span>
                            </div>
                        </div> 
                        :  <div className='flex items-center' >
                                <Link to="/login" className='cursor-pointer hover:text-black'>Sign In or Create Account</Link>
                                <div className='flex items-center text-xs pl-[10px]' >
                                    <div className='px-2 border-l border-gray-100 hover:text-black cursor-pointer'>
                                        <FaFacebookF />
                                    </div>
                                    <div className='px-2 border-l border-gray-100 hover:text-black cursor-pointer'>
                                        <FaTwitter />
                                    </div>
                                    <div className='px-2 border-l border-gray-100 hover:text-black cursor-pointer'>
                                        <FaInstagram />
                                    </div>
                                    <div className='px-2 border-l border-gray-100 hover:text-black cursor-pointer'>
                                        <FaGoogle />
                                    </div>
                                    <div className='px-2 border-l border-gray-100 hover:text-black cursor-pointer'>
                                        <FaPinterest />
                                    </div>
                                </div>
                            </div>}

                </div>
            </div>
            <div className='header__bottom py-9'>
                <div className='max-w-mainWidth m-auto flex items-center justify-between '>
                    <div className='w-1/4' >
                        <img src={logo} alt='logo' />
                    </div>

                    <div className='flex items-center' >
                        <div className='px-5 border-r border-gray-400 text-center' >
                            <div className='flex items-center text-sm font-bold tracking-widest ' >
                                <FaPhoneAlt color='#ee3131' className='mr-[10px]' />
                                <span>(+1800) 000 8808</span>
                            </div>
                            <div className='text-xs'>Mon-Sat 9:00AM - 8:00PM</div>
                        </div>

                        <div className='px-5 border-r border-gray-400 text-center' >
                            <div className='flex items-center text-sm font-bold tracking-widest' >
                                <MdEmail color='#ee3131' className='mr-[10px]' />
                                <span>SUPPORT@TADATHEMES.COM</span>
                            </div>
                            <div className='text-xs'>Online Support 24/7</div>
                        </div>

                        <div className='pl-5'>
                            <div className='flex items-center' >
                                <div className='pt-[10px]' >
                                    <CiHeart size={24} color='#ee3131' className='cursor-pointer' />
                                </div>
                                <div className='pt-[10px] pl-5 flex items-center gap-2' >
                                    <FaShoppingCart size={24} color='#ee3131' className='mr-1' />
                                    <div className='flex gap-1 items-center hover:text-main cursor-pointer' >
                                        <span>0</span>
                                        <span>Item</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header