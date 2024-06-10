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