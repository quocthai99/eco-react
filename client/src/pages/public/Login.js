import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import bgLogo from '../../assets/bg-login.jpg'
import { Button, Input } from '../../components'
import { apiFinalRegister, apiForgotPassword, apiLogin, apiRegister } from'../../services/auth'
import { registerStart, registerSuccess, registerFailed, loginStart, loginSuccess, loginFailed } from '../../redux/auth/authSlice'
import { path } from '../../ultils/path'

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(true)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [isVerifyEmail, setIsVerifyEmail] = useState(false)
  const [tokenRegister, setTokenRegister] = useState('')
  const [email, setEmail] = useState('')
  const [payload, setPayload] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    mobile: ''
  })

  const handlePayload = () => {
    setPayload({
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    })
  }

  const handleSubmit = async() => {
    // const finalPayload = isLogin ? {email: payload.email, password: payload.password} : payload
    // console.log(finalPayload)
    
    const { firstname, lastname, ...data } = payload
    if ( isLogin ) {
      dispatch(loginStart())
      try {
        const response = await apiLogin(data)
        // const accessToken = `Bearer ${response.data.accessToken}`
        // window.localStorage.setItem('accessToken', accessToken)
        dispatch(loginSuccess(response.data))
        navigate(`/${path.HOME}`)
      } catch (error) {
        dispatch(loginFailed())
      }

    } else {
      dispatch(registerStart())
      try {
        const response = await apiRegister(payload)
        if ( response?.data.success ) {
          setIsVerifyEmail(true)
        }
        
      } catch (error) {
        dispatch(registerFailed())
      }
      
    }
  }

  const handleRegister = async() => {
    const response = await apiFinalRegister(tokenRegister)
    if ( response?.data.success ) {
      setIsVerifyEmail(false)
    }
    dispatch(registerSuccess(response.data))
    setIsLogin(true)
  }

  const handleForgotPassword = async() => {
    const response = await apiForgotPassword({email})
    console.log(response)
    if (response?.data?.success) {
      toast.success(response?.data.mes)
    } else {
      toast.error(response?.response?.data.mes)
    }
  }

  return (
    <div className='w-screen h-screen relative' >
      <img src={bgLogo} 
        className='w-full h-full object-cover' 
        alt='bgLogin'
      />
      {isVerifyEmail && <div className='absolute top-0 left-0 right-0 bottom-0 bg-overlay z-50 flex flex-col items-center justify-center ' >
        <div className='bg-white w-[500px] rounded-md p-8 ' >
          <h4>Enter your code</h4>
          <input 
            value={tokenRegister}
            onChange={e => setTokenRegister(e.target.value)} 
            type='text'
            className='p-2 border w-full my-4 rounded-md outline-none '
          />
          <Button 
            title="Submit"
            onClick={handleRegister}
          />
        </div>
      </div>}
      <div className='absolute top-0 bottom-0 right-0 left-0 flex items-center justify-center' >
        <div className='bg-white p-5 max-w-[500px]' >
          {isForgotPassword 
            ? <div className='min-w-[460px] text-[#1c1d1d]' >
              <div className='text-center mb-5'>RESET YOUR PASSWORD</div>
              <div className='border text-center border-[#1c1d1d] px-3 py-[6px] mb-[10px]'>We will send you an email to reset your password.</div>
              <div className='text-center' >
                <div>Email</div>
                <input
                  type='text'
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className='outline-none bg-red-200 w-[260px] h-10 mb-[15px] p-4'
                />
                <div className='flex gap-4' >
                  <Button title="submit" onClick={handleForgotPassword} />
                  <Button title="cancel" onClick={() => setIsForgotPassword(false)} />
                </div>
              </div>
            </div> 
            :
            <div className='flex flex-col min-w-[460px]' >

              <div className='text-center mb-5 uppercase font-bold tracking-widest'>{isLogin ? 'login' : 'create account'}</div>

              <div className='leading-7 text-sm' >
                {!isLogin && <div className='flex items-center justify-between gap-5' >
                  <Input setValue={setPayload} value={payload.firstname} nameKey="firstname" />
                  <Input setValue={setPayload} value={payload.lastname} nameKey="lastname" />
                  <Input setValue={setPayload} value={payload.mobile} nameKey="mobile" />
                </div>}
                <Input
                  setValue={setPayload}
                  value={payload.email}
                  nameKey="email"
                />
                <Input
                  setValue={setPayload} 
                  value={payload.password}
                  nameKey="password" 
                  type="password"
                />
              </div>

              <Button onClick={handleSubmit} title={isLogin ? "sign in" : "create"} />

              <div className='flex justify-between items-center' >
                <span onClick={() => setIsForgotPassword(true)} className='cursor-pointer hover:text-main'>Forgot your password</span>
                <span onClick={() => {
                  handlePayload()
                  setIsLogin(!isLogin)
                }} className='cursor-pointer hover:text-main'>{isLogin ? "Create Account" : "Already have an account"}</span>
              </div>

            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Login