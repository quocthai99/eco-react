import axios from '../axiosConfig'

export const apiGetCategories = async() => {
    try {
        const response = await axios({
            method: 'get',
            url: '/api/category'
        })

        return response.data
    } catch (error) {
        return error
    }
}