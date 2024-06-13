import React, { useEffect, useState } from "react";
import moment from 'moment';

import { apiGetUsers } from "../../services/user";
import { useDebounce } from '../../hook'
import { Pagination } from '../../components'

const ManageUsers = () => {
  const [users, setUsers] = useState(null)
  const [queries, setQueries] = useState({
    q: ''
  })
  const queriesDebounce = useDebounce(queries.q, 1000)

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
  }, [queriesDebounce]);

  return (
    <div>
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b ">
        <span>Manage Users</span>
      </h1>

      <div className="relative overflow-x-auto">
        <div className="flex justify-end py-4 ">
          <input 
            onChange={e => setQueries(prev => ({...prev, q: e.target.value}))}
            value={queries.q}
            type="text"
            className="py-2 px-[10px] min-w-[500px] bg-inputField font-light rounded-sm outline-none mb-4 text-[#1c1d1d] placeholder:text-[#1c1d1d"
            placeholder='Search username'
          />
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">#</th>
              <th scope="col" className="px-6 py-3">Email address</th>
              <th scope="col" className="px-6 py-3">Fullname</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Status</th>
              <th scope="col" className="px-6 py-3">Created At</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users && users.map((user, i) => (
              <tr key={user._id} className="text-white">
                <td className="px-6 py-3 border">{i + 1}</td>
                <td className="px-6 py-3 border">{user.email}</td>
                <td className="px-6 py-3 border">{`${user.lastname} ${user.firstname}`}</td>
                <td className="px-6 py-3 border">{user.role}</td>
                <td className="px-6 py-3 border">{user.mobile}</td>
                <td className="px-6 py-3 border">{user.isBlocked ? 'Block' : 'Active'}</td>
                <td className="px-6 py-3 border">{moment(user.createdAt).fromNow()}</td>
                <td className="px-6 py-3 border flex items-center justify-between">
                  <span className="cursor-pointer hover:underline text-main ">Edit</span>
                  <span className="cursor-pointer hover:underline text-main ">Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="w-full text-center">
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
