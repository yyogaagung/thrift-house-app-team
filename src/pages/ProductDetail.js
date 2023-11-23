import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/productDetail/breadcrumb/BreadCrumb";
import Toko from "../components/productDetail/cardDescToko/Toko";
import CardProductDetail from "../components/productDetail/cardDetailProduct/ProductDetail";
import ModalDetailProduct from "../components/productDetail/modal/Modal";
import ProductList from "../components/productDetail/productList/ProductList";

export default function ProductDetail() {
  function scrollWin() {
    window.scrollTo(0, 0);
  }

  const { display } = useSelector((state) => state.isModalDisplay);

  const params = useParams();
  // const [oneProduct, setOneProduct]=useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    scrollWin();
    setLoading(true);
    axios
      .get(`https://thrifthouse.herokuapp.com/api/v1/products/${params.id}`)
      .then((respone) => {
        // setOneProduct(respone.data.data)
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  }, [params.id]);

  return (
      <div className="" >      
        <Fragment>
        <Breadcrumbs/>
          <CardProductDetail/>
          <Toko /> 
          <ProductList />
          {display && <ModalDetailProduct />}
        </Fragment>
      
      {(!loading && error) && (
        <div className="flex items-center justify-center w-screen h-screen">
          <div className="px-4 lg:py-12">
            <div className="lg:gap-4 lg:flex">
              <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                <h1 className="font-bold text-gogreen text-9xl">404</h1>
                <p className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl">
                  <span className="text-red-500">Oops!</span> Product tidak
                  ditemukan
                </p>
                <p className="mb-8 text-center text-gray-500 md:text-lg">
                  Product yang anda cari tidak ada.
                </p>
                <a
                  href="/"
                  className="px-6 py-2 text-sm font-semibold text-green-800 bg-blue-100"
                >
                  Pergi ke Home
                </a>
              </div>
              <div className="w-96 h-96 mt-4">
                <img
                  src="/oops.png"
                  alt="img"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
