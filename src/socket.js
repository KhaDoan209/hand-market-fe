import { io } from 'socket.io-client';
import cookie from 'cookie';
const cookies = cookie.parse(document.cookie);
const URL =
   import.meta.env.VITE_ENV === 'production'
      ? undefined
      : 'http://localhost:8081';
console.log(cookies.access_token);
export const socket = io(URL, {
   extraHeaders: {
      access_token: `${cookies.access_token}`,
      refresh_token: `${cookies.refresh_token}`,
   },
   autoConnect: true,
});
