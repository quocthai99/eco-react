import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Button } from '../../components'
import { apiResetPassword } from '../../services/auth'
import { path } from '../../ultils/path'

const ResetPassword = () => {
  const navigate = useNavigate()
  const {token} = useParams()
  const [password, setPassword] = useState('')

  const handleResetPassword = async() => { 
    const response = await apiResetPassword({password, token})
    if(response?.data.success) {
      toast.success(response?.data.mes)
      navigate(path.LOGIN)
    }
  }

  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 bg-white z-50 flex justify-center py-8 animate-slide-right ' >
        <div className='flex flex-col gap-4' >
          <label htmlFor='password' >Enter your new password:</label>
          <input
            type='text'
            id='password'
            placeholder='Type here'
            className='w-[800px] pb-2 border-b outline-none placeholder:text-sm '
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <div className='flex items-center justify-end w-full gap-4 ' >
            <Button
              onClick={handleResetPassword}
              title='Submit'
            />
        </div>
      </div>
    </div>
  )
}

export default ResetPassword