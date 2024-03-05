import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    transactionsAll: [],

}

export const transactionsSlice = createSlice({
    name: 'transactions',
    initialState,

    reducers: {
        startTransactions: (state, action) => {
            state.transactionsAll = action.payload
        },

    },
})

export const { startTransactions } = transactionsSlice.actions

export default transactionsSlice.reducer
