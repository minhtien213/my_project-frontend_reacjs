//file thực hiện các call APIs

import * as httpRequest from '~/utils/httpRequest'; //import all trong file httpRequest vào thành object httpRequest

export const search = async (search, search_field = 'name') => {
  try {
    const res = await httpRequest.get('user/get-all', {
      params: {
        search,
        search_field,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

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
        token: `Bearer ${access_token}`,
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

export const updateUser = async (id, access_token, data_update) => {
  // console.log(id, data_update, access_token);
  try {
    const res = await httpRequest.put(`user/update-user/${id}`, data_update, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const changePass = async (id, access_token, pass_update) => {
  // console.log(id, data_update, access_token);
  try {
    const res = await httpRequest.put(`user/update-user/password/${id}`, pass_update, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const resetPass = async (access_token, pass_reset) => {
  // console.log(id, data_update, access_token);
  try {
    const res = await httpRequest.put(`user/reset-password`, pass_reset, {
      headers: {
        token: `Bearer ${access_token}`,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
  }
};
