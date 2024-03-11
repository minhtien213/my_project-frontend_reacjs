//Lưu trữ thông tin
import { configureStore } from '@reduxjs/toolkit';
import useReducer from './userSlice'; //lấy từ export default userSlice.reducer;

export default configureStore({
  reducer: {
    user: useReducer,
  },
});
