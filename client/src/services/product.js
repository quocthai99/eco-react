import axios from "axios"
import axiosConfig from '../axiosConfig'

export const apiGetProducts = async(params) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER_URL}api/product/`,
            params
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiDetailProduct = async(id) => {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER_URL}api/product/${id}`,
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiRatingProduct = async(body) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: '/api/product/ratings',
            data: body
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiCreateProduct = async(data) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: '/api/product/',
            data
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiDeleteProduct = async(pid) => {
    try {
        const response = await axiosConfig({
            method: 'delete',
            url: `/api/product/${pid}`,
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiUpdateProduct = async(data, pid) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/product/${pid}`,
            data
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiAddVarriant = async(data, pid) => {
    try {
        const response = await axiosConfig({
            method: 'put',
            url: `/api/product/varriant/${pid}`,
            data
        })

        return response
    } catch (error) {
        return error
    }
}