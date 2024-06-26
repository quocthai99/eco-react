import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header, Navigation, Footer, ModalVote, ModalCart } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { showCart } from '../../redux/app/appSlice'

const Public = () => {
  const { showModal, modalChildren, isShowCart } = useSelector(state => state.app.displayModalVote)
  const dispatch = useDispatch()
  return (
    <div className='body relative' >
        {showModal && <ModalVote>{modalChildren}</ModalVote>}
        {isShowCart && 
          <div onClick={() => dispatch(showCart())} className='fixed inset-0 bg-overlay z-20 flex justify-end'>
            <ModalCart />
          </div>
        }
        <Header />
        <Navigation />
        <div className='main' >
            <Outlet />
        </div>
        <Footer />
    </div>
  )
}

export default Public