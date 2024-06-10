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
        accessToken: null,
        error: false,
        success: false
    },
    
}

const authSlice = createSlice({
    name: 'auth',
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
            console.log(action)
            state.login.isFetching = false
            state.login.success = true
            state.login.accessToken = action.payload.accessToken
            state.login.currentUser = action.payload.userData
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },
        
    }
})

export const { registerStart, registerSuccess, registerFailed, loginStart, loginSuccess, loginFailed } = authSlice.actions
export default authSlice.reducer