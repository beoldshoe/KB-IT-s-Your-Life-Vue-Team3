import axios from 'axios';

const BASE_TRANSACTION = '/api/transaction';
const BASE_CATEGORY = '/api/category';
const BASE_USER = '/api/user';

export const getTransaction = async (target, params) => {
  try {
    console.log('[GET]', BASE_TRANSACTION + target, params);
    const { data } = await axios.get(BASE_TRANSACTION + target, { params });
    return data;
  } catch (e) {
    console.log('[ERROR]', e);
  }
  return [];
};

export const getCategory = async (target, params) => {
  try {
    console.log('[GET]', BASE_CATEGORY + target, params);
    const { data } = await axios.get(BASE_CATEGORY + target, { params });
    return data;
  } catch (e) {
    console.log('[ERROR]', e);
  }
  return [];
};

export const getUser = async (target, params) => {
  try {
    console.log('[GET]', BASE_USER + target, params);
    const { data } = await axios.get(BASE_USER + target, { params });
    return data;
  } catch (e) {
    console.log('[ERROR]', e);
  }
  return [];
};

export const postTransaction = async (target, budget) => {
  try {
    console.log('[POST]', BASE_TRANSACTION + target, budget);
    const response = await axios.post(BASE_TRANSACTION + target, budget);
    if (response.status === 201) {
      return response.data;
    }
  } catch (e) {
    console.log('[ERROR]', e);
  }
  return {};
};

export const postUser = async (target, user) => {
  try {
    console.log('[POST]', BASE_USER + target, user);
    const response = await axios.post(BASE_USER + target, user);
    if (response.status === 201) {
      return response.data;
    }
  } catch (e) {
    console.log('[ERROR]', e);
  }
  return {};
};

export const putTransaction = async (target, budget) => {
  try {
    console.log('[PUT]', BASE_TRANSACTION + target, budget);
    const response = await axios.put(BASE_TRANSACTION + target, budget);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log('[ERROR]', e);
  }
  return {};
};

export const putUser = async (target, user) => {
  try {
    console.log('[PUT]', BASE_USER + target, user);
    const response = await axios.put(BASE_USER + target, user);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log('[ERROR]', e);
  }
  return {};
};

export const removeTransaction = async (target, params) => {
  try {
    console.log('[DELETE]', BASE_TRANSACTION + target, params);
    const response = await axios.delete(BASE_TRANSACTION + target, params);
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.log('[ERROR]', e);
  }
  return {};
};
