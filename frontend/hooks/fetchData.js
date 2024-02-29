import { useState } from 'react';
import axios from 'axios';

export const fetchUser = () => {
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    let id = localStorage.getItem('user-id');
    id = id.substring(1, id.length - 1);
    // console.log(id);
    try {
      const jwt = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];
      // console.log(jwt);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('cookie', `${jwt}`);
      const res = await fetch(`http://127.0.0.1:8800/users/${id}`, {
        method: 'GET',
        headers: { Cookies: `${jwt}` },
        credentials: 'include',
        // headers: headers,
      });
      // let result;
      // const res = axios
      //   .get(`http://127.0.0.1:8800/users/${id}`, {
      //     withCredentials: true,
      //     headers: {
      //       Cookies: `${jwt}`,
      //     },
      //   })
      //   .then((res) => console.log(res))
      //   .catch((err) => console.log(err));
      // console.log(result);
      const result = await res.json();
      if (!result) throw new Error(result.error);
      return result;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getData };
};

export const fetchUserRegis = () => {
  const [loading, setLoading] = useState(false);
  const getData = async () => {
    setLoading(true);
    try {
      const jwt = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];
      // console.log(jwt);
      const headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('cookie', `${jwt}`);
      const res = await fetch(`http://127.0.0.1:8800/users/getCompleteUser`, {
        method: 'GET',
        headers: { Cookies: `${jwt}` },
        credentials: 'include',
        // headers: headers,
      });
      const result = await res.json();
      // console.log(result);
      if (!result) throw new Error(result.error);
      return result;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getData };
};
