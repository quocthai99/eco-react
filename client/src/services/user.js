import axios from '../axiosConfig'

export const apiRegister = async(payload) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/user/register',
            data: payload,
            withCredentials: true
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiFinalRegister = async(token) => {
    try {
        const response = await axios({
            method: 'put',
            url: `/api/user/finalregister/${token}`
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiLogin = async(payload) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/user/login',
            data: payload,
            withCredentials: true
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiLogout = async() => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/user/logout',
            withCredentials: true
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiRefresh = async(accessToken) => {
    try {
        const response = await axios({
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

export const apiGetCurrent = async(accessToken) => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/user/current',
            headers: {
                authorization: `Bearer ${accessToken}`
            },
        })
        return response
    } catch (error) {
        return error
    }
} 

export const apiForgotPassword = async(payload) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/user/forgotpassword',
            data: payload
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiResetPassword = async(payload) => {
    try {
        const response = await axios({
            method: 'post',
            url: '/api/user/resetpassword',
            data: payload
        })

        return response
    } catch (error) {
        return error
    }
}