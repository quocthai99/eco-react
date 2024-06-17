import React from 'react'

const InputForm = ({ label, disabled, register, errors, id, validate, type='', placeholder, defaultValue }) => {
  return (
    <td className="px-2 py-2 max-w-[80px] border" >
          {label && <label htmlFor={id}>{label}</label>}
          <input 
              className='w-full text-black outline-none px-2'
              type={type}
              id={id}
              defaultValue={defaultValue}
              placeholder={placeholder}
              {...register(id, validate)}
              disabled={disabled}
          />
          {errors[id] && <small>{errors[id].message}</small>}
    </td>
  )
}

export default InputForm