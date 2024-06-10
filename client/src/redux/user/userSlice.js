import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getCurrent: {
        isFetching: false,
        success: false,
        user: null,
        error: false
    },
    logout: {
        isFetching: false,
        error: false,
    },
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getCurrentStart: (state) => {
            state.getCurrent.isFetching = true
        },
        getCurrentSuccess: (state, action) => {
            state.getCurrent.isFetching = false
            state.getCurrent.user = action.payload
            state.getCurrent.success = true
            state.getCurrent.error = false
        },
        getCurrentFaild: (state) => {
            state.getCurrent.isFetching = false
            state.getCurrent.user = null
            state.getCurrent.success = false
            state.getCurrent.error = true
        },
        logoutStart: (state) => {
            state.logout.isFetching = true
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false
            state.getCurrent.user = null
            state.getCurrent.success = false
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false
            state.logout.error = true
        },
    }
})

export const { logoutStart, logoutSuccess, logoutFailed, getCurrentStart, getCurrentSuccess, getCurrentFaild } = userSlice.actions
export default userSlice.reducer