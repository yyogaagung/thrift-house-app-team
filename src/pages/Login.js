import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccessAction } from "../action";
import { Link, useNavigate, Navigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const dispatch = useDispatch();
  const { access_token: accessToken } = useSelector((state) => state.login);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const baseUrl = "https://thrifthouse.herokuapp.com";

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/login`, {
        username,
        password,
      })
      .then((response) => {
        // console.log(response);
        if (response.data.hasOwnProperty("access_token")) {
          navigate("/");
          dispatch(loginSuccessAction(response.data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return accessToken ? (
    <Navigate to="/" replace />
  ) : (
    <div className="container mt-6 px-5 sm:max-w-lg sm:mx-auto lg:flex lg:max-w-5xl lg:mt-24">
      <img
        src="/images/login.png"
        alt="login"
        className="mx-auto w-40 sm:w-[420px] lg:w-[574px] object-contain"
      />
      <form
        className="flex flex-col justify-between h-full lg:justify-start"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="text-center mt-6">
            <h1 className="font-bold text-[#29A867] sm:text-[42px]">
              Masuk ke akunmu
            </h1>
            <p className="text-slate-400 text-sm mt-1 mb-6 sm:text-lg">
              Masukkan data untuk melanjutkan
            </p>
          </div>
          <label className="" htmlFor="username">
            <span className="text-sm leading-5 mb-1 block">Username</span>
          </label>
          <input
            id="username"
            className="h-9 border-[#CFCFCF] border rounded-lg w-full text-xs py-3 px-2 mb-4 placeholder:text-slate-300 focus:outline-none focus:ring-1 block focus:ring-[#4DB680]"
            type={"text"}
            placeholder="Masukkan username kamu"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="" htmlFor="password">
            <span className="text-sm leading-5 mb-1 block">Kata Sandi</span>
          </label>
          <input
            id="password"
            className="h-9 border-[#CFCFCF] border rounded-lg w-full text-xs py-3 px-2 placeholder:text-slate-300
          focus:outline-none focus:ring-1 block focus:ring-[#4DB680]"
            type={"password"}
            placeholder="Masukkan kata sandi kamu"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <a
            href="/"
            className="mt-4 text-right block text-xs text-[#29A867] sm:text-base"
          >
            Lupa kata sandi?
          </a>
        </div>
        <div className="flex flex-col mt-10 lg:mt-0">
          <button className="h-11 py-3 mb-3 bg-[#4DB680] text-sm text-white rounded-lg sm:static sm:w-full sm:mt-8">
            Masuk
          </button>
          <div className="text-xs text-center mb-2 left-1/2 sm:static sm:translate-x-0 sm:text-base">
            <span className="block sm:text-center sm:my-6">
              Belum punya akun?{" "}
              <Link to="/register" className="text-[#29A867] underline">
                Daftar
              </Link>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}
