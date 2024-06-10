import axios from "axios"

export const apiGetCategories = async() => {
    try {
        const response = await axios({
            method: 'get',
            url: `${process.env.REACT_APP_SERVER_URL}api/category`
        })

        return response.data
    } catch (error) {
        return error
    }
}