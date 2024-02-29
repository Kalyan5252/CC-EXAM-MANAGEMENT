import { useState } from 'react';

const useExams = () => {
  const [loading, setLoading] = useState(false);
  const getExams = async () => {
    setLoading(true);
    try {
      const jwt = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];

      const res = await fetch('http://127.0.0.1:8800/exams', {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json', Cookies: jwt },
        headers: { Cookies: `${jwt}` },
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
  return { loading, getExams };
};

export default useExams;

export const useExam = () => {
  const [loading, setLoading] = useState(false);
  const getExam = async (id) => {
    setLoading(true);
    try {
      const jwt = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];
      const res = await fetch(`http://127.0.0.1:8800/exams/${id}`, {
        method: 'GET',
        headers: { Cookies: `${jwt}` },
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
  return { loading, getExam };
};

export const useRegisterExam = () => {
  const [loading, setLoading] = useState(false);
  const registerExam = async (id) => {
    setLoading(true);
    try {
      const jwt = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];
      const res = await fetch(`http://127.0.0.1:8800/exams/update/${id}`, {
        method: 'PATCH',
        headers: { Cookies: `${jwt}` },
        credentials: 'include',
      });
      const result = await res.json();
      return result;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, registerExam };
};

export const usePostExam = () => {
  const [loading, setLoading] = useState(false);
  const postExam = async ({ title, examDate, description }) => {
    setLoading(true);
    try {
      console.log({ title, examDate, description });
      const body = JSON.stringify({ title, examDate, description });
      console.log('body', body);
      const jwt = document.cookie
        .split('; ')
        .find((row) => row.startsWith('jwt='))
        ?.split('=')[1];
      const res = await fetch(`http://127.0.0.1:8800/exams/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Cookies: `${jwt}` },
        credentials: 'include',
        body,
      });
      const result = await res.json();
      return result;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  return { loading, postExam };
};
