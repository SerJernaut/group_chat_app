import http from './index.js';
import {ID_KEY} from '../../constants';

const authenticateUser = async (url, data, config) => {
  try {
    const response = await http.post(url, data, config);
    const { data: {id} } = response;
    sessionStorage.setItem(ID_KEY, id);
    return response;
  } catch (e) {
    throw e;
  }
};


export const signUpUser = async (data) => authenticateUser('/sign_up', data, {
  headers: {
    'Content-type': 'multipart/form-data',
  },
});

export const loginUser = async (data) => authenticateUser('/login', data, {
  headers: {
    'Content-type': 'application/json',
  },
});