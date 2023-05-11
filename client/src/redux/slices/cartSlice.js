import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    totalPrice: 0,
  },
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }

      state.totalPrice += newItem.price * newItem.quantity;
    },

    removeItem(state, action) {
      const itemId = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== itemId);
      } else {
        existingItem.quantity--;
      }

      state.totalPrice -= existingItem.price;
    },

    updateItemQuantity(state, action) {
      const { itemId, quantity } = action.payload;
      const existingItem = state.items.find((item) => item.id === itemId);

      existingItem.quantity = quantity;

      state.totalPrice = state.items.reduce((total, item) => total + item.price * item.quantity, 0);
    },

    clearCart(state, action) {
      state.items = [];
      state.totalPrice = 0;
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
