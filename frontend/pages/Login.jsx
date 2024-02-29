'use client';
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import useLogin from '../hooks/useLogin';
import {
  useAuthContext,
  AuthContextProvider,
  AuthContext,
} from '../contexts/authContext';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });
  const { loading, login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  };
  const router = useRouter();
  // let authUser;
  const { authUser } = useContext(AuthContext);
  // console.log(authUser);

  useEffect(() => {
    const checkLoginStatus = async () => {
      // Your logic to fetch login status asynchronously (e.g., from context, API, etc.)
      if (!loading) {
        if (authUser) {
          router.push('/');
        }
      }
    };

    checkLoginStatus();
  });

  return (
    // <AuthContextProvider>
    <div className="flex h-screen justify-center items-center">
      {/* <div>{console.log('authUser')}</div> */}
      <div className="p-10 rounded-lg bg-white shadow-lg">
        <form
          className="flex flex-col min-w-[250px] gap-4"
          onSubmit={handleSubmit}
        >
          <label className="text-center font-bold text-xl underline mb-4">
            Login
          </label>
          <div className="flex flex-col w-full gap-2">
            <label className="text-gray-500">email </label>
            <input
              type="email"
              className="outline-none focus:outline-stone-950 px-3 py-1 rounded-lg bg-gray-200"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
          </div>
          <div className="flex flex-col w-full gap-2">
            <div className="flex justify-between items-center">
              <label className="text-gray-500">Password </label>
              <a
                href="#"
                className="text-sm text-blue-600 hover:underline transition-all"
              >
                Forgot Your Password?
              </a>
            </div>
            <input
              type="password"
              className="focus:outline-stone-950  px-3 py-1 rounded-lg bg-gray-200"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>
          {/* <div className="lp_links w-full flex flex-col gap-4 p-2 mt-4 text-sm">
            <p className="flex gap-4">
              <Link
                to={'/signup'}
                href="#"
                className=" hover:underline transition-all hover:text-blue-600 "
              >
                Signup
              </Link>
            </p>
          </div> */}
          <div className="mt-4 self-center">
            <button
              type="submit"
              className="btn btn-outline btn-sm hover:bg-blue-600 hover:text-white px-4 py-2 rounded-lg transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
    // </AuthContextProvider>
  );
};

export default Login;
