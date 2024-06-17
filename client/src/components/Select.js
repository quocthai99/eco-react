import React from 'react'

const Select = ({label, options = [], register, errors, id, validate}) => {
  return (
    <td className="px-2 py-2 max-w-[80px] text-black border">
      {label && <label htmlFor={id}>{label}</label>}
      <select className='w-full outline-none' id={id} {...register(id, validate)}>
        <option value="">CHOOSE</option>
        {options?.map(el => (
          <option key={el.code} value={el.code}>{el.value}</option>
        ))}
      </select>
      {errors[id] && <small className='text-xs text-main'>{errors[id]?.message}</small>}
    </td>
  )
}

export default Select