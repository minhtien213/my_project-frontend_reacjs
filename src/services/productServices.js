//file thực hiện các call APIs

import * as httpRequest from '~/utils/httpRequest'; //import all trong file httpRequest vào thành object httpRequest

export const search = async (search, search_field = 'name', pageSize = 3, pageCurrent = 1) => {
  try {
    const res = await httpRequest.get('product/get-all', {
      params: {
        search,
        search_field,
        pageSize,
        pageCurrent,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailProduct = async (name) => {
  try {
    const res = await httpRequest.get(`product/get-detail/${name}`, {
      params: {
        name: name,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
