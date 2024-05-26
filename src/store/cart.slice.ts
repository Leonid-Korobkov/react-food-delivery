import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { loadState } from './storage'

export interface CartProduct {
  id: number
  count: number
}
export interface CartState {
  products: CartProduct[]
}
const initialState: CartState = {
  products: loadState<CartState>('cart')?.products ?? []
}

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    clearCart: (state) => {
      state.products = []
    },

    clearProduct: (state, action: PayloadAction<number>) => {
      const index = state.products.findIndex((p) => p.id === action.payload)
      state.products.splice(index, 1)
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload)

      if (product && product.count > 1) {
        product.count--
      } else {
        const index = state.products.findIndex((p) => p.id === action.payload)
        state.products.splice(index, 1)
      }
    },

    addProduct: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload)

      // если есть такой продукт
      if (product) {
        product.count++
      } else {
        state.products.push({ id: action.payload, count: 1 })
      }
    }
  }
})

export const CartActions = CartSlice.actions

export default CartSlice.reducer
