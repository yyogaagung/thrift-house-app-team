import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { favAction } from "./action";
import { Route, Routes } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout";
import Home from "./pages";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import ErrorPage from "./pages/ErrorPage";
import Alamat from "./pages/Alamat";
import Favorite from "./pages/Favorite";
import TokoDetail from "./pages/TokoDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Search from "./pages/Search";
import useScrollToTop from "./utils/useScrollToTop";
import ProfileAkun from "./pages/ProfileAkun";
import Payment from "./pages/Payment";
import PanduanPembayaran from "./pages/PanduanPembayaran";

function App() {
  const { id: userId } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  useScrollToTop();

  // get product favorite list
  useEffect(() => {
    if (userId) dispatch(favAction(userId));
  }, [userId, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route path="favorit" element={<Favorite />} />
            <Route path="/keranjang" element={<Cart />} />
            <Route path="keranjang/alamat" element={<Alamat />} />
            <Route path="keranjang/checkout" element={<Checkout />} />
            <Route
              path="keranjang/payment/panduanpembayaran"
              element={<PanduanPembayaran />}
            />
            <Route path="keranjang/payment/:orderId" element={<Payment />} />
            <Route path="/account" element={<ProfileAkun />}></Route>
          </Route>
          <Route path="cari" element={<Search />} />
          <Route path="/toko/:id" element={<TokoDetail />} />
          <Route path="/:category/:id" element={<ProductDetail />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
