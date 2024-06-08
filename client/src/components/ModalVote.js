import React from 'react'
import { useDispatch } from 'react-redux'
import { displayVoteSuccess } from '../redux/app/appSlice'

const ModalVote = ({ children }) => {
    const dispatch = useDispatch()

  return (
    <div
        onClick={() => dispatch(displayVoteSuccess({showModal: false, modalChildren: null}))}
        className='absolute inset-0 bg-overlay z-10 flex items-center justify-center'
    >
        {children}
    </div>
  )
}

export default ModalVote