import { Icon } from "@iconify/react";
import Dropzone from "../components/checkout/Dropzone";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import Countdown from "../components/checkout/Countdown";
import { useSelector } from "react-redux";

const Payment = () => {
  const [image, setImage] = useState([]);
  const [orderInfo, setOrderInfo] = useState({});
  const [countdown, setCountdown] = useState([23, 59, 59]);
  const [loading, setLoading] = useState(false);
  const [copiedStatus, setCopiedStatus] = useState(false);
  const { orderId } = useParams();
  const navigation = useNavigate();
  const { username } = useSelector((state) => state.login);

  // get order info
  useEffect(() => {
    axios
      .get(`https://thrifthouse.herokuapp.com/api/v1/orders/${orderId}/payment`)
      .then((res) => setOrderInfo(res.data.data))
      .catch((err) => navigation("/"));
  }, [orderId, navigation]);

  // handle submit
  const submitPaymentHandler = () => {
    const data = new FormData();
    data.append("photo", image[0].file);
    setLoading(true);
    axios
      .put(
        `https://thrifthouse.herokuapp.com/api/v1/orders/${orderId}/payment/receipt`,
        data
      )
      .then((res) => {
        setLoading(false);
        setOrderInfo((prev) => ({ ...prev, receipt: res.data.data.url }));
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  // handle copy button
  const copiedHandler = () => {
    navigator.clipboard.writeText(orderInfo.bank.bankNumber);
    setCopiedStatus(true);
    setTimeout(() => {
      setCopiedStatus(false);
    }, 2000);
  };

  return (
    <div className="customcontainer mx-auto max-w-[786px] px-6 sm:px-0 my-12 sm:my-16">
      {Object.keys(orderInfo).length === 0 ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="thisisstatus">
            <h3 className="font-medium text-base sm:text-lg sm:text-center">
              Selamat {username},
            </h3>
            <h3 className="font-medium text-base sm:text-lg sm:text-center mb-3 sm:mb-4">
              Pesanan kamu telah berhasil dibuat!
            </h3>
            <div className="text-sm sm:text-base mb-3 sm:mb-6 sm:text-center">
              Status{" "}
              <span className="text-xs sm:text-sm bg-[#FBCA03] p-1 rounded">
                {orderInfo.status}
              </span>
            </div>
            <div className="text-xs sm:font-medium sm:text-lg mb-2 sm:text-center">
              Selesaikan pembayaran dalam
            </div>
            <div className="font-bold text-sm sm:text-2xl mb-2 sm:text-center">
              <Countdown
                expiredAt={orderInfo.expiredAt}
                countdown={countdown}
                setCountdown={setCountdown}
                orderInfo={orderInfo}
              />
            </div>
            <div className="text-xs sm:text-base sm:font-medium mb-3 sm:mb-10 sm:text-center">
              atau transaksimu akan dibatalkan oleh sistem
            </div>
          </div>

          <div className="thisisorderid border border-[#B4B4B4] rounded mx-auto mb-3 sm:mb-10">
            <div className="p-4 flex flex-col sm:flex-row sm:justify-between border-b border-[#B4B4B4]">
              <div className="text-sm mb-1 sm:mb-0 sm:text-lg">
                ID Pembayaran
              </div>
              <div className="text-sm font-bold sm:text-lg">
                {orderInfo.orderCode}
              </div>
            </div>

            <div className="p-4 border-b border-[#B4B4B4]">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1 sm:mb-4">
                <div className="mb-1 sm:mb-0 text-sm sm:text-lg">
                  Rekening pembayaran
                </div>
                <div className="w-11 sm:w-16">
                  <img
                    src="/images/bca.png"
                    alt="bank"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between">
                <div>
                  <div className="font-bold text-sm sm:text-2xl mb-1 sm:mb-4">
                    {orderInfo.bank.bankNumber}{" "}
                    <Icon
                      icon="bx:copy-alt"
                      height="24"
                      className="inline sm:hidden"
                      onClick={() =>
                        navigator.clipboard.writeText(orderInfo.bank.bankNumber)
                      }
                    />
                  </div>
                  <div className="text-xs sm:text-base font-medium text-[#8F8F8F]">
                    {orderInfo.bank.bankHolder}
                  </div>
                </div>
                <div className="hidden sm:block" onClick={copiedHandler}>
                  <div className="border border-gogreen py-3 px-12 rounded-lg text-gogreen cursor-pointer">
                    {copiedStatus ? "Tersalin" : "Salin"}{" "}
                    <Icon icon="bx:copy-alt" height="24" className="inline" />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 flex justify-between items-center">
              <div className="text-sm mb-1 sm:mb-0 sm:text-lg">
                Total pembayaran
              </div>
              <div className="text-sm font-bold sm:text-lg text-gogreen">
                Rp
                {(
                  orderInfo.productsPrice + orderInfo.shippingCost
                ).toLocaleString("id-ID")}
              </div>
            </div>
          </div>

          <div className="mb-4 sm:mb-10">
            <Link
              to="/keranjang/payment/panduanpembayaran"
              className="font-medium text-sm sm:text-lg underline cursor-pointer"
            >
              Lihat panduan pembayaran
            </Link>
          </div>

          <div className="thisisbuktipembayaran mb-6 sm:mb-10">
            <div className="font-bold text-sm sm:text-lg mb-1 sm:mb-2">
              Bukti Pembayaran
            </div>
            <div className="text-sm sm:text-base mb-4 sm:mb-8">
              Upload bukti transfer pembayaranmu disini
            </div>
            {orderInfo.receipt === "" ? (
              <Dropzone image={image} setImage={setImage} />
            ) : (
              <div className="relative flex flex-col sm:flex-row items-center">
                <div className="w-[245px] mr-7 mb-3 sm:mb-0">
                  <img
                    src={orderInfo.receipt}
                    alt={orderInfo.id}
                    className="w-full h-auto object-contain"
                  />
                </div>
                <div>
                  <p className="text-sm sm:text-base text-[#0C0D36] mb-2 sm:mb-6 text-center sm:text-left">
                    {orderInfo.id}
                  </p>
                  <p className="text-sm sm:text-base text-[#0C0D36] text-center sm:text-left">
                    <Icon
                      icon="ep:success-filled"
                      height="24"
                      className="text-gogreen inline"
                    />{" "}
                    Upload berhasil ({orderInfo.id} Mb)
                  </p>
                </div>
              </div>
            )}
          </div>

          {orderInfo.receipt === "" && countdown.length !== 0 && (
            <>
              {image.length === 0 ? (
                <button
                  className="bg-[#F2F2F2] py-4 w-full text-[#B4B4B4] rounded-lg mb-4"
                  disabled
                >
                  Kirim
                </button>
              ) : (
                <button
                  className="bg-gogreen py-4 w-full text-white rounded-lg mb-4"
                  onClick={submitPaymentHandler}
                  disabled={loading}
                >
                  {loading ? (
                    <Spinner size={"sm"} className={"mx-auto"} />
                  ) : (
                    "Kirim"
                  )}
                </button>
              )}
            </>
          )}

          <Link to="/">
            <button className="bg-white border border-gogreen py-4 w-full text-gogreen rounded-lg mb-4">
              Kembali ke beranda
            </button>
          </Link>
        </>
      )}
    </div>
  );
};

export default Payment;
