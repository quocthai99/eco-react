import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { Sidebar } from './components/sidebar'

import { path } from '../../ultils/path'

const AdminLayout = () => {
  const { user, success } = useSelector(state => state.user.getCurrent)

  if( !success ) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />
  } else if ( success && user?.role !== 'admin' ) {
    return <Navigate to={`/${path.HOME}`} replace={true} />
  }

  return (
    <div className='flex w-full min-h-screen bg-sky-900 text-white'>
      <div className='w-[327px] flex-none'>
        <Sidebar />
      </div>

      <div className='flex-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout