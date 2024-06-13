import React from 'react'

const PageItem = ({page}) => {
  return (
    <div>
        <div className='bg-gray-200 cursor-pointer hover:bg-gray-300 px-5 py-2 max-w-10 flex items-center justify-center rounded-full'>
            {page}
        </div>
    </div>
  )
}

export default PageItem