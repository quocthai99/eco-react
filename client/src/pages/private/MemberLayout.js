import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/path'

const MemberLayout = () => {
  const { success, user } = useSelector(state => state.user.getCurrent)

  if ( !success ) {
    return <Navigate to={`/${path.LOGIN}`} replace={true} />
  } else if (success && user?.role !== 'user') {
    return <Navigate to={`/${path.HOME}`} replace={true} />
  }
  
  return (
    <div>
      Member
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default MemberLayout