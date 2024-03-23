//file tạo các instances chứa các end points APIs
//cấu hình các end points để thực hiện các requests
//dùng cho file services

import axios from 'axios';

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, //end point
  headers: {
    'Content-Type': 'application/json',
  },
});

export default httpRequest;
