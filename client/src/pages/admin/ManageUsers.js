import React, { useCallback, useEffect, useState } from "react";
import moment from 'moment';
import {useForm} from 'react-hook-form'

import { apiDeleteUser, apiGetUsers, apiUpdateUser } from "../../services/user";
import { useDebounce } from '../../hook'
import { Pagination, InputForm, Select } from '../../components'
import { blockStatus } from "../../ultils/constant";

const ManageUsers = () => {
  const [users, setUsers] = useState(null)
  const [queries, setQueries] = useState({
    q: ''
  })
  const [editUser, setEditUser] = useState(null)
  const [isRender, setIsRender] = useState(false)
  const queriesDebounce = useDebounce(queries.q, 1000)
  const { handleSubmit, register, formState: {errors} } = useForm({
    email: '',
    firstname: '',
    lastname: '',
    role: '',
    mobile: '',
    status: ''
  })
  
  const fetchUsers = async (params) => {
    const response = await apiGetUsers(params);
    if(response?.data?.success) {
      setUsers(response.data.users)
    }
  };
  
  useEffect(() => {
    const params = {}
    if (queriesDebounce) params.q = queriesDebounce
    fetchUsers(params);
  }, [queriesDebounce, isRender]);

  const handleDeleteUser = async(userId) => {
    const response = await apiDeleteUser(userId)
    if(response?.data.success) reRender()
  }

  const reRender = useCallback(() =>  {
    setIsRender(!isRender)
  }, [isRender])

  const handleUpdateUser = async(user) => {
    const response = await apiUpdateUser(user, editUser._id)
    if(response?.data.success) {
      reRender()
      setEditUser(null)
    }
  }
  
  return (
    <div>
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b ">
        <span>Manage Users</span>
      </h1>

      <div className="w-full pr-5">
        <div className="flex justify-end py-4 ">
          <input 
            onChange={e => setQueries(prev => ({...prev, q: e.target.value}))}
            value={queries.q}
            type="text"
            className="py-2 px-[10px] min-w-[500px] bg-inputField font-light rounded-sm outline-none mb-4 text-[#1c1d1d] placeholder:text-[#1c1d1d"
            placeholder='Search username'
          />
        </div>

        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <table className="w-full text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th className="px-6 py-3 text-center">#</th>
                <th className="px-6 py-3 text-center">Email address</th>
                <th className="px-6 py-3 text-center">Firstname</th>
                <th className="px-6 py-3 text-center">Lastname</th>
                <th className="px-6 py-3 text-center">Role</th>
                <th className="px-6 py-3 text-center">Phone</th>
                <th className="px-6 py-3 text-center">Status</th>
                <th className="px-6 py-3 text-center">Created At</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users && users.map((user, i) => (
                <tr key={user._id} className="text-white text-xs">
                  <td className="text-center py-2 border">{i + 1}</td>
                  <td className="text-center py-2 border">{user.email}</td>
                  {editUser?._id === user._id
                    ?
                      <InputForm
                        register={register}
                        type="firstname"
                        id="firstname"
                        errors={errors}
                        defaultValue={editUser.firstname}
                      />
                    :
                      <td className="text-center py-2 border">{user.firstname}</td>
                  }
                  {editUser?._id === user._id
                    ?
                      <InputForm
                        register={register}
                        type="lastname"
                        id="lastname"
                        errors={errors}
                        defaultValue={editUser.lastname}
                      />
                    :
                      <td className="text-center py-2 border">{user.lastname}</td>
                  }
                  <td className="text-center py-2 border">{user.role}</td>
                  {editUser?._id === user._id
                    ?
                      <InputForm
                        register={register}
                        type="mobile"
                        id="mobile"
                        errors={errors}
                        defaultValue={editUser.mobile}
                      />
                    :
                      <td className="text-center py-2 border">{user.mobile}</td>
                  }
                  {editUser?._id === user._id 
                    ? 
                      <Select 
                        register={register}
                        options={blockStatus}
                        id="isBlocked"
                        errors={errors}
                      /> 
                    : 
                      <td className="text-center py-2 border">{user.isBlocked ? 'Blocked' : 'Active'}</td>}
                  <td className="text-center py-2 border">{moment(user.createdAt).fromNow()}</td>
                  <td className="text-center py-2 border flex items-center justify-around">
                    {editUser?._id === user._id
                      ? <button type="submit" className="cursor-pointer hover:underline text-main ">Update</button>
                      : <span onClick={() => setEditUser(user)} className="cursor-pointer hover:underline text-main ">Edit</span>}
                    {editUser?._id === user._id
                      ? <span onClick={() => setEditUser(null)} className="cursor-pointer hover:underline text-main ">Cancel</span>
                      : <span onClick={() => handleDeleteUser(user._id)} className="cursor-pointer hover:underline text-main ">Delete</span>}
                  </td>
              </tr>
              ))}
            </tbody>
          </table>
        </form>

        <div className="w-full text-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
