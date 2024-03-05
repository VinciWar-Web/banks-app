import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from './transactions/transactionsSlice'
import myUserReducer from './myUser/myUserSlice'



export const store = configureStore({
  reducer: {
    transactionsReducer,
    myUserReducer
  },
})