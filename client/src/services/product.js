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