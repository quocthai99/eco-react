import React from 'react'

const Button = ({title, onClick, leftIcon, cusWidth }) => {
  return (
    <button 
      onClick={onClick}
      className={`bg-main flex items-center gap-2 justify-center text-white  px-4 py-3 uppercase hover:bg-black ${ cusWidth ? cusWidth : 'w-full'}`}
      >
        <span>{leftIcon || ''}</span>
        {title}
    </button>
  )
}

export default Button