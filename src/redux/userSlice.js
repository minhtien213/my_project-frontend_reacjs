//Lưu thông tin muốn truyền
import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user', //tên ...
  initialState: {
    //giá trị khởi tạo khi lần đầu load trang
    _id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    images: [],
  },
  reducers: {
    //chứa các hành động có thể thực hiện được với slise này(create, update, delete...)
    updateUser: (state, action) => {
      const { _id, name, email, phone, address, password, images } = action.payload;
      console.log(action.payload);
      state._id = _id;
      state.name = name;
      state.email = email;
      state.phone = phone;
      state.password = password;
      state.address = address;
      state.images = images;
    },
    resetUser: (state) => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.phone = '';
      state.password = '';
      state.address = '';
      // state.images = [];
    },
  },
});

//export reducer ra ngoài
export const { updateUser, resetUser } = userSlice.actions; //xuất hành động update trong userSlice.reducers.updateUser
export default userSlice.reducer;
