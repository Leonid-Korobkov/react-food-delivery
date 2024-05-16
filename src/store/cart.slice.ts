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
    addProduct: (state, action: PayloadAction<number>) => {
      const product = state.products.find((p) => p.id === action.payload)
      if (product) {
        // если есть такой продукт
        product.count++
      } else {
        state.products.push({ id: action.payload, count: 1 })
      }
    }
  }
})

export const CartActions = CartSlice.actions

export default CartSlice.reducer
