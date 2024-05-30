import React from 'react'
import { Outlet } from 'react-router-dom'

import { Header, Navigation } from '../../components'

const Public = () => {
  return (
    <div className='body' >
        <Header />
        <Navigation />
        <div className='main' >
            <Outlet />
        </div>
    </div>
  )
}

export default Public