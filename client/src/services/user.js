import axiosConfig from '../axiosConfig'
// import axios from 'axios'


export const apiRefresh = async(accessToken) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/user/refreshToken',
            withCredentials: true,
            headers: {
                authorization: `Bearer ${accessToken}`
            }
        })
        return response
    } catch (error) {
        return error 
    }
}

// export const apiGetCurrent = async(accessToken) => {
//     try {
//         const response = await axios({
//             method: 'get',
//             url: `${process.env.REACT_APP_SERVER_URL}api/user/current`,
//             headers: {
//                 authorization: `Bearer ${accessToken}`
//             }
//         })
//         return response
//     } catch (error) {
//         return error
//     }
// } 

export const apiGetCurrent = async() => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/user/current',
        })
        return response
    } catch (error) {
        return error
    }
} 

export const apiGetUsers = async(params) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/user',
            params
        })
        return response
    } catch (error) {
        return error
    }
} 

export const apiUpdateUser = async(data, id) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/user/${id}`,
            data
        })
        return response
    } catch (error) {
        return error
    }
} 

export const apiUpdateCurrent = async(data) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/user/current`,
            data
        })
        return response
    } catch (error) {
        return error
    }
} 

export const apiDeleteUser = async(uid) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/user/${uid}`,
        })
        return response
    } catch (error) {
        return error
    }
} 

export const apiUpdateCart = async(data) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/user/cart`,
            data
        })
        return response
    } catch (error) {
        return error
    }
}

export const apiRemoveCart = async(pid) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/user/remove-cart/${pid}`,
        })
        return response
    } catch (error) {
        return error
    }
}