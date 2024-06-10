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