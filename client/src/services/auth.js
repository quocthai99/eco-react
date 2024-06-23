import axios from "axios"
import axiosConfig from "../axiosConfig"

export const apiRegister = async(payload) => {
    try {
        const response = await axios({
            method: 'post',
            url: `${process.env.REACT_APP_SERVER_URL}api/user/register`,
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
            url: `${process.env.REACT_APP_SERVER_URL}api/user/finalregister/${token}`
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiLogin = async(payload) => {
    try {
        const response = await axiosConfig({
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
            url: `${process.env.REACT_APP_SERVER_URL}api/user/logout`,
            withCredentials: true
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
            url: `${process.env.REACT_APP_SERVER_URL}api/user/forgotpassword`,
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
            url: `${process.env.REACT_APP_SERVER_URL}api/user/resetpassword`,
            data: payload
        })

        return response
    } catch (error) {
        return error
    }
}