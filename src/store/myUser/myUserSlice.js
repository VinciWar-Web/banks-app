import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    myUser: {},

}

export const myUserSlice = createSlice({
    name: 'myUser',
    initialState,

    reducers: {
        startMyUser: (state, action) => {
            state.myUser = action.payload
        },

    },
})

export const { startMyUser } = myUserSlice.actions

export default myUserSlice.reducer
