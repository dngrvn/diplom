import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, checkIsAuth } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status)
    }
    if (isAuth) {
      navigate('/main')
    }
}, [status, isAuth, navigate])

  const handleSubmit = (e) => {
    e.preventDefault();
    if ( username && password ) {
      dispatch(loginUser({ username, password }));
      setUsername("");
      setPassword("");
    } else {
      toast.error("Все поля обязательны к заполнению");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className="text-lg text-white text-center">Авторизация</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700 required"
        />
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700 required"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 text-white py-2 px-4"
        >
          Войти
        </button>
        <Link
          to="/register"
          className="flex justify-center items-center text-xs text-white"
        >
          Нет аккаунта?
        </Link>
      </div>
    </form>
  );
};

export default Login;
