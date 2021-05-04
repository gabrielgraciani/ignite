import { parseCookies, setCookie } from 'nookies';
import axios, { AxiosError } from 'axios';

let cookies = parseCookies();

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization: `bearer ${cookies['igniteNextauth.token']}`,
  },
});

api.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response.status === 401) {
      if (error.response.data?.code === 'token.expired') {
        // renovar o token
        cookies = parseCookies();

        const { 'igniteNextauth.refreshToken': refreshToken } = cookies;

        api
          .post('/refresh', {
            refreshToken,
          })
          .then(response => {
            const { token } = response.data;

            setCookie(undefined, 'igniteNextauth.token', token, {
              maxAge: 60 * 60 * 24 * 30, // 30 days
              path: '/',
            });
            setCookie(
              undefined,
              'igniteNextauth.refreshToken',
              response.data.refreshToken,
              {
                maxAge: 60 * 60 * 24 * 30, // 30 days
                path: '/',
              },
            );

            api.defaults.headers.Authorization = `Bearer ${token}`;
          });
      } else {
        // deslogar o usuario
      }
    }
  },
);
