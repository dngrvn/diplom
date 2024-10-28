import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, checkIsAuth } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const { status } = useSelector((state) => state.auth);
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status) {
      toast(status);
    }
    if (isAuth) {
      navigate('/main');
    }
  }, [status, isAuth, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      return toast.error("Пароль должен содержать минимум 8 символов, включая цифры и латинские буквы");
    }

    if (username && password && email && firstName && lastName && phoneNumber && dateOfBirth) {
      dispatch(registerUser({ username, password, email, firstName, lastName, phoneNumber, dateOfBirth })); // диспатчим регистрацию
      setUsername("");
      setPassword("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhoneNumber("");
      setDateOfBirth("");
    } else {
      toast.error("Все поля обязательны к заполнению");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/2 h-auto mx-auto mt-20"
    >
      <h1 className="text-lg text-white text-center">Регистрация</h1>
      <label className="text-xs text-gray-400">
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="first name"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="last name"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Phone Number:
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="phone number"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <label className="text-xs text-gray-400">
        Date of Birth:
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          placeholder="__.__.____"
          className="mt-1 text-black w-full rounded-lg bg-gray-400 py-1 px-2 text-xs outline-none placeholder:text-gray-700"
        />
      </label>

      <div className="flex gap-8 justify-center mt-4">
        <button
          type="submit"
          className="flex justify-center items-center text-xs bg-gray-600 text-white py-2 px-4"
        >
          Подтвердить
        </button>
        <Link
          to="/login"
          className="flex justify-center items-center text-xs text-white"
        >
          Уже зарегистрированы?
        </Link>
      </div>
    </form>
  );
};

export default Register;