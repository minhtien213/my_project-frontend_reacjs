//file tạo các instances chứa các end points APIs
//cấu hình các end points để thực hiện các requests
//dùng cho file services

import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, //end point
  //     timeout: 1000,
  //   headers: {'X-Custom-Header': 'foobar'} - thêm token...
});

export const get = async (url, options = {}) => {
  const response = await httpRequest.get(url, options);
  return response.data;
};

export const post = async (url, options = {}) => {
  const response = await httpRequest.post(url, options);
  return response.data;
};

export default httpRequest;

//using:
// request //không cần res.json(), có thể nhận object chứa các thuộc tính query
//   .get('users/search', { //không cần end point ở đầu API
//     params: { //object chứa các query parameter
//       q: debounced,
//       type: 'less',
//     },
//   });

//vd: dùng ở file services
// const search = async (q, type = 'less') => {
//     try {
//       const res = await request.get('users/search', {
//         params: {
//           q,
//           type,
//         },
//       });
//       return res.data;
//     } catch (error) {
//       console.log(error);
//     }
//   };
