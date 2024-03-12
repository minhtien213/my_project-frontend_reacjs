//file thực hiện các call APIs

import * as httpRequest from '~/utils/httpRequest'; //import all trong file httpRequest vào thành object httpRequest

export const login = async (data_login) => {
  try {
    const res = await httpRequest.post('user/sign-in', data_login);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailUser = async (id, access_token) => {
  try {
    const res = await httpRequest.get(`user/get-detail/${id}`, {
      headers: {
        token: `Beare ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data_register) => {
  try {
    const res = await httpRequest.post(`user/sign-up`, { data_register });
    return res;
  } catch (error) {
    console.log(error);
  }
};
