import React, { useEffect, useRef } from 'react'


import { icons } from '../ultils/icons'

const { AiFillStar } = icons

const Votebar = ({ star, totalRatings, totalCount}) => {
  const percentRef = useRef()
  
  useEffect(() => {
    const percent = (totalCount / totalRatings ) * 100 || 0
    percentRef.current.style.right = `${100 - Math.round(percent) }%`
  }, [totalCount, totalRatings])

  return (
    <div className='flex gap-5 items-center'>
      <div className='flex gap-2 items-center w-[5%]'>
        <span>{star}</span>
        <AiFillStar color='orange' />
      </div>

      <div className='w-[80%]'>
        <div className='bg-gray-300 w-full h-[5px] relative rounded-r-full rounded-l-full'>
          <div ref={percentRef} className={`absolute left-0 h-[5px] bg-main rounded-r-full rounded-l-full`}></div>
        </div>
      </div>

      <div className='w-[15%]'>
        <span>{`${totalCount || 0} đánh giá`}</span>
      </div>
    </div>
  )
}

export default Votebar

// số người đánh giá từ 1-5 sao
// tông số bài đánh giá
// 13 bài đánh giá => 100%
// số người đánh giá 5 sao là 7 người
// => hỏi số người đánh giá 5 sao chiếm bao nhiêu %

// số bài đánh giá: 13
// số người đánh giá 5 sao: 7
// tính % số bài đánh giá 5 sao?

