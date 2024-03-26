//Lưu trữ thông tin
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; //lấy từ export default userSlice.reducer;
import productReducer from './productSlice'; //lấy từ export default userSlice.reducer;
import orderReducer from './orderSlice'; //lấy từ export default userSlice.reducer;

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    order: orderReducer,
  },
});

export default store;
