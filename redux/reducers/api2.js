import axios, { AxiosError, AxiosResponse } from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

let api = axios.create({
  baseURL: API_BASE_URL,
  // timeout: 3000,
});

api.interceptors.request.use(function (config) {
  if (localStorage.getItem("access_token"))
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;

  return config;
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error)
        if( error.response.status === 400 && error.response.data['err'] && error.response.data['err']['message'] === 'jwt expired ') {
            localStorage.removeItem('access_token')
        }

        console.log(error, error.response)
        // Do something with response error
        return Promise.reject(error);
    }
);

export default function Api2(state = api) {
  return { ...state };
}
