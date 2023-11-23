import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://thrifthouse.herokuapp.com/register", {
        email: email,
        password: password,
        phone: phone,
        role: "ROLE_USER",
        username: username,
      })
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mt-6 px-5 sm:max-w-lg sm:mx-auto lg:flex lg:max-w-5xl lg:mt-24">
      <img src="/images/register.png" alt="login" className="mx-auto w-40 sm:w-[420px] lg:w-[574px] object-contain" />
      <div>
        <div className="text-center mt-6">
          <h1 className="font-bold text-[#29A867] sm:text-[40px]">Daftarkan akunmu</h1>
          <p className="text-slate-400 text-sm mt-1 mb-6 sm:text-lg">Masukkan data untuk melanjutkan</p>
        </div>
        <form onSubmit={handleSubmit} className="">
          <label className="" for="username">
            <span className="text-sm leading-5 mb-1 block">Username</span>
          </label>
          <input
            id="username"
            className="h-9 border-[#CFCFCF] border rounded-lg w-full text-xs py-3 px-2 mb-4 placeholder:text-slate-300 focus:outline-none focus:ring-1 block focus:ring-[#4DB680]"
            type="text"
            placeholder="Masukkan nama kamu"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="" for="email">
            <span className="text-sm leading-5 mb-1 block">Email</span>
          </label>
          <input
            id="email"
            className="h-9 border-[#CFCFCF] border rounded-lg w-full text-xs py-3 px-2 mb-4 placeholder:text-slate-300 focus:outline-none focus:ring-1 block focus:ring-[#4DB680]"
            type="email"
            placeholder="Masukkan email kamu"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label className="" for="phone">
            <span className="text-sm leading-5 mb-1 block">Nomor HP</span>
          </label>
          <input
            id="phone"
            className="h-9 border-[#CFCFCF] border rounded-lg w-full text-xs py-3 px-2 mb-4 placeholder:text-slate-300
        focus:outline-none focus:ring-1 block focus:ring-[#4DB680]"
            type="text"
            placeholder="Masukkan nomor HP kamu"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
          <label className="" for="password">
            <span className="text-sm leading-5 mb-1 block">Kata Sandi</span>
          </label>
          <input
            id="password"
            className="h-9 border-[#CFCFCF] border rounded-lg w-full text-xs py-3 px-2 placeholder:text-slate-300
        focus:outline-none focus:ring-1 block focus:ring-[#4DB680]"
            type="password"
            placeholder="Masukkan kata sandi kamu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input type="checkbox" id="register-tnc" required className="mt-4 mr-1 accent-[#29A867] w-4 h-5" />
          <label className="text-xs sm:text-base" for="register-tnc">
            Dengan mencentang ini, kamu menyetujui{" "}
            <a href="/" className="text-[#29A867]">
              Syarat & Ketentuan
            </a>{" "}
            kami.
          </label>
          <div className="flex flex-col mt-10 lg:mt-0">
            <button className="h-11 py-3 mb-3 bg-[#4DB680] text-sm text-white rounded-lg sm:static sm:w-full sm:mt-8">Daftar</button>
            <div className="text-xs text-center mb-2 sm:text-base">
              <span className="block sm:text-center sm:my-6">
                Sudah punya akun?{" "}
                <a className="text-[#29A867] underline" href="/">
                  Masuk
                </a>
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
