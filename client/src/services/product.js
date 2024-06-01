import axiosConfig from '../axiosConfig'

export const apiGetProducts = async(params) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: '/api/product/',
            params
        })

        return response
    } catch (error) {
        return error
    }
}

export const apiDetailProduct = async(id) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `/api/product/${id}`,
        })

        return response
    } catch (error) {
        return error
    }
}