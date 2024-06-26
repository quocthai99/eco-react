import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from 'react-hook-form'
import moment from 'moment'
import {toast} from 'react-toastify'

import { InputProduct } from '../../components'
import avatar from '../../assets/avatar.png'
import { apiUpdateCurrent } from "../../services/user";
import { getCurrentSuccess } from "../../redux/user/userSlice";

const Personal = () => {
  const { user } = useSelector(state => state.user.getCurrent)
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  console.log(user)

  const handleUpdateUser = async (data) => {
    const formData = new FormData()

    if(data.avatar.length > 0) {
      formData.append('avatar', data.avatar[0])
      delete data.avatar
    }
    else {
      delete data.avatar
    }

    for(let i of Object.entries(data)) formData.append(i[0], i[1])
    const response = await apiUpdateCurrent(formData)
    if(response.data.success) {
      dispatch(getCurrentSuccess(response.data.updatedUser))
      toast.success(response.data.mes)
    }
  }

  useEffect(() => {
    reset({
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      mobile: user.mobile,
      avatar: user.avatar
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return (
    <div>
      <h1 className="h-[75px] mx-5 flex justify-between items-center text-3xl font-bold px-4 border-b ">
        <span>Personal</span>
      </h1>

      <form onSubmit={handleSubmit(handleUpdateUser)} className="mt-10 px-5">
        <div className="grid grid-cols-2 gap-5">
          <InputProduct id="firstname" register={register} errors={errors} label="Firstname" />
          <InputProduct id="lastname" register={register} errors={errors} label="Lastname" />
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <InputProduct id="email" register={register} errors={errors} label="Email" />
          <InputProduct id="mobile" register={register} errors={errors} label="Mobile" />
        </div>

        <div className="my-5 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">Account status:</span>
            <span>{user?.isBlocked ? 'Blocked' : 'Actived'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Role:</span>
            <span>{user.role === 'user' ? 'user' : 'admin'}</span>
          </div>
          <div>
            <span className="font-medium">Create At: </span>
            <span>{moment(user?.createdAt).fromNow()}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Profile image:</span>
          <label htmlFor="file-avatar">
            <img src={user?.avatar || avatar} alt="avatar" className="w-10 h-10 object-cover rounded-full cursor-pointer" />
          </label>
          <input {...register('avatar')} type="file" id="file-avatar" hidden />
        </div>

        <button type="submit" className="px-5 py-2 w-1/3  mt-10 bg-main rounded-md hover:bg-black">Update information</button>
      </form>


    </div>
  );
};

export default Personal;
