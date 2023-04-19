import axios, { AxiosRequestConfig } from 'axios';
import { HTTP_METHOD, LOCAL_STORAGE, STATUS_CODE } from '../utils/common';

const axiosInstance = axios.create({
  timeout: 6000,
  baseURL: '',
  headers: {
    Accept: '*/*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem(LOCAL_STORAGE.TOKEN)
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  config => {
    const data = {
      status_code: config.status,
      ...config?.data,
    };

    return data;
  },
  error => {
    // if needs to navigate to login page when request exception
    if (error.response?.status === STATUS_CODE.UNAUTHORIZED) {
      localStorage.clear();
      if (['/home'].indexOf(window.location.pathname) < 0) {
        window.location.href = '/home';
      }
    }

    return {
      status: false,
      result: null,
      message: error.response?.data?.message,
      status_code: error.response?.status,
    };
  }
);

export const request = (
  method,
  url,
  result,
  config
) => {
  if (
    method === HTTP_METHOD.POST ||
    method === HTTP_METHOD.PUT ||
    method === HTTP_METHOD.DELETE
  ) {
    return axiosInstance[method](url, result, config);
  } else {
    return axiosInstance.get(url, {
      params: result,
      ...config,
    });
  }
};
