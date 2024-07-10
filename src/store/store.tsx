import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slice/user-info-slice'
import envReducer from './slice/env-info-slice'

export const store = configureStore({
  reducer: {
    userInfo: userReducer,
    envInfo: envReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
