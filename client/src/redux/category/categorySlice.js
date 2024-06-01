import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getCategories: {
        isFetching: false,
        categories: null,
        error: false
    }
}

const categorySlice = createSlice({
    name: 'category',
    initialState,
    reducers: {
        getCategoriesStart: (state) => {
            state.getCategories.isFetching = true
        },
        getCategoriesSuccess: (state, action) => {
            state.getCategories.isFetching = false
            state.getCategories.categories = action.payload
            state.getCategories.error = false
        },
        getCategoriesError: (state) => {
            state.getCategories.isFetching = false
            state.getCategories.error = true
        }
    }
})

export const { getCategoriesStart, getCategoriesSuccess, getCategoriesError } = categorySlice.actions
export default categorySlice.reducer