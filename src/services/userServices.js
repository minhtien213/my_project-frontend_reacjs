//file thực hiện các call APIs

import * as httpRequest from '~/utils/httpRequest'; //import all trong file httpRequest vào thành object httpRequest

export const login = async (data) => {
  try {
    const res = await httpRequest.post('user/sign-in', data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailUser = async (id, accessToken) => {
  try {
    const res = await httpRequest.get(`user/get-detail/${id}`, {
      headers: {
        token: `Beare ${accessToken}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
