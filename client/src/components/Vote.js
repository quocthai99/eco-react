import React, { useState } from "react";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import logo from "../assets/logo.png";
import { voteOptions } from "../ultils/constant";
import {Button} from "../components";
import { apiRatingProduct } from "../services/product";
import { path } from "../ultils/path";

import { icons } from "../ultils/icons";
import { displayVoteSuccess } from "../redux/app/appSlice";

const { AiFillStar } = icons

const Vote = ({pid}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [activeStar, setActiveStar] = useState(null)
  const [comment, setComment] = useState('')
  const { user } = useSelector(state => state.user.getCurrent)
  console.log(user)
  const handleVoteProduct = async () => {
    if (user) {
      const response = await apiRatingProduct({ comment, star: activeStar, pid })
      console.log(response)
      if(response.data.success) {
        dispatch(displayVoteSuccess({showModal: false, modalChildren: null }))
      }
    } else {
      Swal.fire('Oop!', 'Can\'t vote product. Please Login ', 'error').then(() => {
        navigate(`/${path.LOGIN}`)
        dispatch(displayVoteSuccess({showModal: false, modalChildren: null }))
      })
    }
    
  }
  
  return (
    <div 
      onClick={(e) => e.stopPropagation()}
      className="bg-white w-[700px] p-5 flex-col gap-5 flex items-center justify-center rounded-md "
    >
      <img src={logo} alt="logo" className="w-[300px] object-contain " />
      <h2 className="text-center text-lg">{`Vote the product`}</h2>
      <textarea
        cols={30}
        rows={10}
        className="w-full h-[50px] p-3 border "
        placeholder="Type something?"
        value={comment}
        onChange={e => setComment(e.target.value)}
      ></textarea>

      <div className="w-full flex flex-col gap-5 justify-center items-center">
        <p>How do you like this product?</p>
        <div className="flex gap-5 items-center">
          {voteOptions.map((el) => (
            <div
              className="w-[100px] bg-gray-200 hover:bg-gray-300 cursor-pointer rounded-md p-4 flex items-center justify-center flex-col gap-2 "
              key={el.id}
              onClick={() => setActiveStar(el.id)}
            >
              { activeStar >= el.id ? <AiFillStar color="orange" /> : <AiFillStar color="gray" />}
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      </div>

      <Button 
        title="Vote now" 
        onClick={handleVoteProduct}
      />
    </div>
  );
};

export default Vote;
