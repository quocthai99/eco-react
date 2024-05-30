import React from 'react'

const Button = ({title, onClick, leftIcon }) => {
  return (
    <button 
      onClick={onClick}
      className='bg-main w-full flex items-center gap-2 justify-center text-white  px-4 py-3 uppercase hover:bg-black'
      >
        <span>{leftIcon || ''}</span>
        {title}
    </button>
  )
}

export default Button