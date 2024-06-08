import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    register: {
        isFetching: false,
        error: false,
        mes: '',
    },
    login: {
        isFetching: false,
        currentUser: null,
        error: false,
        success: false
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
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state, action) => {
            state.register.isFetching = false
            state.register.mes = action.payload.mes
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.error = true
        },
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.success = true
            state.login.currentUser = action.payload.userData
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        logoutStart: (state) => {
            state.logout.isFetching = true
        },
        logoutSuccess: (state) => {
            state.logout.isFetching = false
            state.login.success = false
            state.login.currentUser = null
        },
        logoutFailed: (state) => {
            state.logout.isFetching = false
            state.logout.error = true
        },
    }
})

export const { logoutStart, logoutSuccess, logoutFailed, registerStart, registerSuccess, registerFailed, loginStart, loginSuccess, loginFailed } = userSlice.actions
export default userSlice.reducer