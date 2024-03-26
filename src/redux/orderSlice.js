import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    list_order: [],
    totalPrice: 0,
  },
  reducers: {
    updateOrder: (state, action) => {
      // console.log(action.payload);
      const { list_order, totalPrice } = action.payload;
      state.list_order = list_order;
      state.totalPrice = totalPrice;
    },
  },
});

export const { updateOrder } = orderSlice.actions;
export default orderSlice.reducer;
