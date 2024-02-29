import { useState } from 'react';

const useEvents = () => {
  const [loading, setLoading] = useState(false);
  const getEvents = async () => {
    setLoading(true);
    try {
      const jwt = document.cookie
        .split('; ')
        .find((r) => r.startsWith('jwt='))
        ?.split('=')[1];
      const res = await fetch(`http://127.0.0.1:8800/events/`, {
        method: 'GET',
        headers: {
          Cookies: `${jwt}`,
        },
        credentials: 'include',
      });
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, getEvents };
};

export default useEvents;
