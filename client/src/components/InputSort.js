import React from 'react'

const InputSort = ({ value, changeValue, options }) => {
  return (
    <select value={value} onChange={e => changeValue(e.target.value)} className='border text-sm min-w-[500px] px-5 py-3' >
        <option >Choose</option>
        {options && options.map(el => (
            <option
                key={el.id}
                value={el.value}
                className=' bg-white py-5'
            >
                {el.text}
            </option>
        ))}
    </select>
  )
}

export default InputSort