import { configureStore } from '@reduxjs/toolkit'
import userSlice from './user.slice'
import { saveState } from './storage'
import cartSlice from './cart.slice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['user/getProfile/fulfilled', 'user/login/fulfilled']
      }
    })
})

store.subscribe(() => {
  saveState('userData', { token: store.getState().user.jwt })
  saveState('cart', store.getState().cart)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
