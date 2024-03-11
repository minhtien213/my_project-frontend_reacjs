//Lưu thông tin muốn truyền
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user', //tên ...
  initialState: {
    //giá trị khởi tạo khi lần đầu load trang
    name: '',
    email: '',
    accessToken: '',
  },
  reducers: {
    //chứa các hành động có thể thực hiện được với slise này(create, update, delete...)
    updateUser: (state, action) => {
      //hành động update - nhận 2 giá trị (state: giá trị khởi tạo ở trên, action: hành động bên ngoài truyền vào)
      const { name, email, accessToken } = action.payload;
      console.log(action.payload)
      state.name = name; //gán giá trị mới bên ngoài truyền vào từ action.payload cho name trong state khởi tạo
      state.email = email;
      state.accessToken = accessToken;
    },
  },
});

//export reducer ra ngoài
export const { updateUser } = userSlice.actions; //xuất hành động update trong userSlice.reducers.updateUser
export default userSlice.reducer;
