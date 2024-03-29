//file thực hiện các call APIs

import httpRequest from '~/utils/httpRequest'; //import all trong file httpRequest vào thành object httpRequest

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
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailUser = async (id, access_token) => {
  try {
    const res = await httpRequest.get(`user/get-detail/${id}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (data_register) => {
  try {
    const res = await httpRequest.post(`user/sign-up`, { data_register });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (id, access_token, data_update) => {
  // console.log(id, data_update, access_token);
  try {
    const res = await httpRequest.put(`user/update-user/${id}`, data_update, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateAvatar = async (id, access_token, formData) => {
  try {
    const res = await httpRequest.put(`user/update-avatar/${id}`, formData, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const changePass = async (id, access_token, pass_update) => {
  try {
    const res = await httpRequest.put(`user/change-password/${id}`, pass_update, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const resetPass = async (access_token, pass_reset) => {
  // console.log(id, data_update, access_token);
  try {
    const res = await httpRequest.put(`user/reset-password`, pass_reset, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};

export const addCart = async (access_token, data) => {
  try {
    const res = await httpRequest.put('user/add-cart', data, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const removeCartItem = async (access_token, data) => {
  try {
    const res = await httpRequest.delete(
      'user/remove-cart',
      { data: data },
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
