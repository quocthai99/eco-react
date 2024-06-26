import React from 'react'
import { useDispatch } from 'react-redux'
import { displayVoteSuccess } from '../redux/app/appSlice'

const ModalVote = ({ children }) => {
    const dispatch = useDispatch()

  return (
    <div
        onClick={() => dispatch(displayVoteSuccess({showModal: false, modalChildren: null}))}
        className='fixed inset-0 flex items-center justify-center bg-overlay z-20'
    >
        {children}
    </div>
  )
}

export default ModalVote