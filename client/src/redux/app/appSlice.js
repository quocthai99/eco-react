import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayModalVote: {
        showModal: false,
        modalChildren: null,
        isShowCart: false
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        displayVoteSuccess: (state, action) => {
            state.displayModalVote.showModal = action.payload.showModal
            state.displayModalVote.modalChildren = action.payload.modalChildren
        },
        showCart: (state) => {
            state.displayModalVote.isShowCart = state.displayModalVote.isShowCart === false ? true : false
        }
    }
})

export const { showCart, displayVoteSuccess } = appSlice.actions
export default appSlice.reducer