import React from 'react'

const CountDown = ({unit, number}) => {
  return (
    <div className='w-[30%] h-[60px] flex justify-center items-center rounded-md bg-[#F4F4F4] flex-col ' >
        <span className='text-[18px] text-gray-800 '>{number || 0}</span>
        <span className='text-xs text-gray-700'>{unit || 'time'}</span>
    </div>
  )
}

export default CountDown