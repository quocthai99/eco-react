import React from 'react'

const Input = ({nameKey, value, setValue, type}) => {
  return (
    <div className='w-full' >
        <input 
            value={value}
            onChange={(e) => setValue(prev => ({...prev, [nameKey]: e.target.value}))}
            className='w-full py-2 px-[10px] bg-inputField font-light rounded-sm outline-none mb-4 text-[#1c1d1d] placeholder:text-[#1c1d1d'
            placeholder={nameKey}
            type={'text' && type}
        />
    </div>
  )
}

export default Input