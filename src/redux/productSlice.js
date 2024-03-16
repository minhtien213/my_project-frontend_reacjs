//Lưu thông tin muốn truyền
import { createSlice } from '@reduxjs/toolkit';

export const productSlice = createSlice({
  name: 'product', //tên ...
  initialState: {
    //giá trị khởi tạo khi lần đầu load trang
    searchValue: null,
    pageCurrent: 1,
  },
  reducers: {
    //chứa các hành động có thể thực hiện được với slise này(create, update, delete...)
    updateSearchValue: (state, action) => {
      //hành động update - nhận 2 giá trị (state: giá trị khởi tạo ở trên, action: hành động bên ngoài truyền vào)
      state.searchValue = action.payload[0]; //gán giá trị mới bên ngoài truyền vào từ action.payload cho name trong state khởi tạo
      state.pageCurrent = action.payload[1]; //gán giá trị mới bên ngoài truyền vào từ action.payload cho name trong state khởi tạo
    },
  },
});

//export reducer ra ngoài
export const { updateSearchValue } = productSlice.actions; //xuất hành động update trong productSlice.reducers.updateUser
export default productSlice.reducer;
