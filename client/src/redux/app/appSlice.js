import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    displayModalVote: {
        showModal: false,
        modalChildren: null
    }
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        displayVoteSuccess: (state, action) => {
            state.displayModalVote.showModal = action.payload.showModal
            state.displayModalVote.modalChildren = action.payload.modalChildren
        }
    }
})

export const { displayVoteSuccess } = appSlice.actions
export default appSlice.reducer