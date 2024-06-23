import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/path'
import MemberSidebar from './components/sidebar/MemberSidebar'

const MemberLayout = () => {
  const { success, user } = useSelector(state => state.user.getCurrent)

  if ( !success ) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />
  } else if (success && user?.role !== 'user') {
    return <Navigate to={`/${path.HOME}`} replace={true} />
  }
  
  return (
    <div className='w-full min-h-screen bg-sky-900 text-white'>
      <div className='w-[300px] absolute top-0 left-0 bottom-0'>
        <MemberSidebar />
      </div>
      <div className='ml-[300px]'>
        <Outlet />
      </div>
    </div>
  )
}

export default MemberLayout