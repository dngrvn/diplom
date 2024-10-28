import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { checkIsAuth, logout } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";

const Navbar = () => {
  const isAuth = useSelector(checkIsAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeStyles = {
    color: "white",
  };

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    toast("Вы вышли из аккаунта");
    navigate("/");
  };

  return (
    <div className="flex py-4 px-8 justify-between items-center">
      <span className="flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm">
        <Link to="/">
          <Logo width ="100%" height="100%"/>
        </Link>
      </span>

      {isAuth && (
        <ul className="flex gap-8">
          <li>
            <NavLink
              to={"/main"}
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Главная
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/posts"}
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Мои посты
            </NavLink>
          </li>

          <li>
            <NavLink
              to={"/new"}
              className="text-xs text-gray-400 hover:text-white"
              style={({ isActive }) => (isActive ? activeStyles : undefined)}
            >
              Добавить пост
            </NavLink>
          </li>
        </ul>
      )}

      <div className="flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2">
        {isAuth ? (
          <button onClick={logoutHandler} aria-label="Выйти">Выйти</button>
        ) : (
          <Link to={"/login"}>Войти</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
