import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header, Navigation, Footer, ModalVote } from '../../components'
import { useSelector } from 'react-redux'

const Public = () => {
  const { showModal, modalChildren } = useSelector(state => state.app.displayModalVote)

  return (
    <div className='body relative' >
        {showModal && <ModalVote>{modalChildren}</ModalVote>}

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