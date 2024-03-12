//Lưu trữ thông tin
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; //lấy từ export default userSlice.reducer;

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
