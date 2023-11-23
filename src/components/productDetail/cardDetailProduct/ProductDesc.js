import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { favAdd, isDisplayModalFunc, checkoutAdd } from "../../../action";
import { Icon } from "@iconify/react";

export default function DescProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const [oneProduct, setOneProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const price = oneProduct.price
    ? oneProduct.price.toLocaleString("id-ID")
    : "";
  const { access_token: accessToken, id: userId } = useSelector(
    (state) => state.login
  );
  const navigate = useNavigate();
  const [isFavClicked, setIsFavClicked] = useState(false);
  const [fullProduct, setFullProduct] = useState([]);

  const beliSekarangHandler = () => {
    let temp = [{ ...fullProduct, product: [fullProduct.product] }];
    dispatch(checkoutAdd(temp));
    navigate("/keranjang/checkout");
  };

  const favHandler = () => {
    if (userId) {
      axios
        .post(
          `https://thrifthouse.herokuapp.com:443/api/v1/users/${userId}/products/favorites`,
          { productId: params.id }
        )
        .then((res) => {
          dispatch(favAdd(res.data.data.productId));
          setIsFavClicked((prev) => !prev);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login", { replace: true });
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://thrifthouse.herokuapp.com/api/v1/products/${params.id}`)
      .then((respone) => {
        setOneProduct(respone.data.data.product);
        setFullProduct(respone.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  }, [params.id]);

  function showHiddenModal(e) {
    e.preventDefault();
    dispatch(isDisplayModalFunc(true));
  }

  function addToCart(e) {
    e.stopPropagation();
    const dataProduct = {
      productId: params.id,
    };
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .post(
        `https://thrifthouse.herokuapp.com/api/v1/users/${userId}/cart`,
        dataProduct,
        config
      )
      .then((response) => {
        console.log(response);
        navigate("/keranjang");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Fragment>
      {loading === true ? (
        <div className=" w-full lg:p-52 lg:w-1/2 mb-28 flex justify-center items-center ">
          <div className=" w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin "></div>
        </div>
      ) : (
        <div className="lg:w-3/5 md:container  h-auto p-10  bg-slate-500shadow-inner">
          <div>
            <div className="flex justify-between ">
              <p className="font-bold text-lg">{oneProduct.brand}</p>

              <div
                className=" bg-white p-1 rounded-full cursor-pointer"
                onClick={favHandler}
              >
                {isFavClicked ? (
                  <Icon
                    icon="ant-design:heart-filled"
                    height="24"
                    className="text-red-600"
                  />
                ) : (
                  <Icon
                    icon="ant-design:heart-outlined"
                    height="24"
                    className="text-[#6B7280]"
                  />
                )}
              </div>
            </div>
            <p className="font-normal text-xl mb-1">{oneProduct.name}</p>
            <div className="flex">
              <p className="bg-slate-300 font-extralight rounded px-2 py-[0.5px] text-center mr-3 text-base">
                {oneProduct.condition}
              </p>
              <p className="bg-slate-300 font-extralight rounded px-2 py-[0.5px] text-center text-base">
                {oneProduct.size}
              </p>
            </div>
            <p className="text-gogreen font-bold text-xl mt-2 mb-8">
              Rp{price}
            </p>
            <div className=" flex flex-wrap mb-10">
              <button
                onClick={(e) => addToCart(e)}
                className="rounded w-72 h-12 border-2 mb-3  border-gogreen text-gogreen py-3 px-6 mr-5 flex items-center justify-center  hover:bg-gogreen hover:text-white "
              >
                Tambah ke keranjang
              </button>
              <button
                onClick={beliSekarangHandler}
                className="rounded w-72 h-12 bg-gogreen text-white py-3 px-6 mr-5 flex items-center justify-center hover:bg-green-600"
              >
                Beli sekarang
              </button>
            </div>
            <hr className="text-gray-400 mb-5" />
          </div>

          <div className="h-auto">
            <p className="font-bold">Spesifikasi Produk</p>
            <ul className="w-3/5 mb-6 leading-7">
              <li className="flex w-full   justify-between">
                <p className="font-light text-stone-500">Kondisi</p>
                <span className="flex justify-start lg:w-3/5 sm:w-full">
                  <p>
                    {oneProduct.condition}
                    <a
                      onClick={showHiddenModal}
                      href="/"
                      className="w-1 h-1 bg-gogreen px-1 rounded-full text-slate-50 ml-2"
                    >
                      ?
                    </a>
                  </p>
                </span>
              </li>
              <li className="flex w-full  justify-between">
                <p className="font-light text-stone-500">Panjang</p>
                <span className="flex justify-start w-3/5">
                  <p>{oneProduct.height} cm</p>
                </span>
              </li>
              <li className="flex w-full  justify-between">
                <p className="font-light text-stone-500">Lebar</p>
                <span className="flex justify-start w-3/5 ">
                  <p>{oneProduct.width} cm</p>
                </span>
              </li>
              <li className="flex w-full  justify-between">
                <p className="font-light text-stone-500">Bahan</p>
                <span className="flex justify-start lg:w-3/5 sm:w-full  ">
                  <p>{oneProduct.material}</p>
                </span>
              </li>
            </ul>
            <hr className="text-gray-400 mb-5" />
            <p className="font-bold">Deskripsi</p>
            <p>{oneProduct.description}</p>
          </div>
          {/* </Fragment> 
                )} 
                {(!loading && error) && <div>TERJADI KESALAHAN</div>} */}
        </div>
      )}
    </Fragment>
  );
}
