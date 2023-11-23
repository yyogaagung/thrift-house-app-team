import { useState, useEffect, useMemo } from "react";
import ModalAlamat from "../components/checkout/ModalAlamat";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import CheckoutProduct from "../components/checkout/CheckoutProduct";

// function to calculate total shipping cost
const totalCostFunc = (totalShippingCost) =>
  totalShippingCost.reduce((a, b) => a + b, 0);

// function to calculate total product price
const totalPriceFunc = (products) => {
  let total = 0;
  let qty = 0;
  let ids = [];
  products.forEach((item) => {
    item.product.forEach((item2) => {
      total += item2?.price;
      qty += 1;
      ids.push(item2?.id);
    });
  });
  return { total, qty, ids };
};

const Checkout = () => {
  // const [checkout, setCheckout] = useState({});
  const [isAlamatOpen, setIsAlamatOpen] = useState(false);
  const [alamat, setAlamat] = useState([]);
  const [selectedAlamat, setSelectedAlamat] = useState([]);
  const [bank, setBank] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [totalShippingCost, setTotalShippingCost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const { id } = useSelector((state) => state.login);
  const products = useSelector((state) => state.checkout.value);
  let navigate = useNavigate();

  // calculate total shipping cost and total product price
  const totalPrice = useMemo(() => totalPriceFunc(products), [products]);
  const totalCost = useMemo(
    () => totalCostFunc(totalShippingCost),
    [totalShippingCost]
  );

  // get address and bank data from API
  useEffect(() => {
    if (id) {
      if (products.length === 0) navigate(-1);
      // setCheckout((prev) => ({ ...prev, userId: id }));

      axios
        .get(`https://thrifthouse.herokuapp.com/api/v1/users/${id}/addresses`)
        .then((res) => {
          setAlamat(res.data.data);
          // check if there is a primary address
          const found = res.data.data.find((item) => item.addressLabel);
          setSelectedAlamat(found ? found : res.data.data[0]);
          // setCheckout((prev) => ({
          //   ...prev,
          //   addressId: found ? found.id : res.data.data[0].id,
          // }));
        })
        .catch((err) => {
          console.log(err);
          // check if there is no address, then redirect to add address page
          if (err.response.data.statusCode === 404) {
            navigate("/keranjang/alamat");
          }
        });

      axios
        .get("https://thrifthouse.herokuapp.com/api/v1/bank")
        .then((res) => setBank(res.data.data))
        .catch((err) => console.log(err));

      // set transactions state - productIds
      let transactions = [];
      products.forEach((item) => {
        const result = item.product.map((e) => e.id);
        transactions = [...transactions, { productIds: result }];
      });
      setTransactions(transactions);
    }
  }, [id, navigate, products.length, products]);

  // input data to checkout state
  // useEffect(() => {
  //   setCheckout((prev) => ({ ...prev, shippingCost: totalCost }));
  //   setCheckout((prev) => ({
  //     ...prev,
  //     productsPrice: totalPrice.total,
  //   }));
  //   setCheckout((prev) => ({ ...prev, productIds: totalPrice.ids }));
  // }, [totalCost, totalPrice.ids, totalPrice.total]);

  // handle selected bank radio button
  const selectedBankHandler = (e) => setSelectedBank(e.target.value);

  // handle submit checkout button
  const checkoutHandler = () => {
    const data = {
      addressId: selectedAlamat.id,
      bankId: selectedBank,
      storeTransactions: transactions,
      userId: id,
    };
    // console.log(data);
    setLoading(true);
    axios
      .post(`https://thrifthouse.herokuapp.com/api/v1/orders`, data)
      .then((res) => {
        setLoading(false);
        // console.log(res.data);
        navigate(`/keranjang/payment/${res.data.data.order_id_1}`);
        // open new tab if order more than 1 store
        if (Object.keys(res.data.data).length > 1) {
          for (const key in res.data.data) {
            if (key !== "order_id_1") {
              console.log(
                `${process.env.REACT_APP_BASEURL}/keranjang/payment/${res.data.data[key]}`
              );
              window.open(
                `${process.env.REACT_APP_BASEURL}/keranjang/payment/${res.data.data[key]}`
              );
            }
          }
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <div className="customcontainer mx-auto grid grid-cols-1 md:grid-cols-12 md:space-x-10 mt-24 px-6 md:px-0">
        <section className="thisisleftside col-span-8">
          <div className="thisisalamatpengiriman mb-8">
            <h3 className="font-bold text-sm md:text-lg mb-4">
              Alamat Pengiriman
            </h3>
            <div className="border-[1px] border-[#CECFD7] p-4 rounded-lg mb-4">
              {selectedAlamat.length === 0 ? (
                <Spinner />
              ) : (
                <>
                  <p className="mb-2 text-sm md:text-base">
                    <span className="font-bold">
                      {selectedAlamat?.recipientName}
                    </span>{" "}
                    {selectedAlamat?.addressLabel && "(Utama)"}
                  </p>
                  <p className="mb-2 text-xs md:text-base">
                    {selectedAlamat?.recipientPhone}
                  </p>
                  <p className="mb-2 text-xs md:text-base">
                    {selectedAlamat?.fullAddress}
                  </p>
                  <p className="text-xs md:text-base">
                    {`${selectedAlamat?.province}, ${selectedAlamat?.city}, ${selectedAlamat?.district}, ${selectedAlamat?.village}, ${selectedAlamat?.postalCode}`}
                  </p>
                </>
              )}
            </div>
            <button
              className="mb-4 px-5 py-[10px] border-[1px] border-gogreen rounded-lg text-gogreen text-xs md:text-base"
              onClick={() => setIsAlamatOpen((prev) => !prev)}
            >
              Pilih Alamat Lain
            </button>

            {isAlamatOpen && (
              <ModalAlamat
                isAlamatOpen={isAlamatOpen}
                setIsAlamatOpen={setIsAlamatOpen}
                alamat={alamat}
                setSelectedAlamat={setSelectedAlamat}
              />
            )}
          </div>

          <div className="thisisdetail mb-8">
            <h3 className="font-bold text-sm md:text-lg mb-4">
              Detail Produk & Pengiriman
            </h3>
            {products.length !== 0 &&
              products.map((item) => (
                <CheckoutProduct
                  key={item.product[0].id}
                  item={item}
                  selectedAlamat={selectedAlamat}
                  setTotalShippingCost={setTotalShippingCost}
                  setTransactions={setTransactions}
                />
              ))}
          </div>
        </section>

        <section className="thisisrightside col-span-4">
          <div className="py-6 shadow-[0px_0.5px_10px_rgba(0,0,0,0.15)] rounded-lg">
            <div className="px-6">
              <h3 className="font-bold text-base md:text-lg mb-4">
                Ringkasan belanja
              </h3>
              <div className="flex justify-between mb-2">
                <p className="text-[#5D5E79] text-sm md:text-base">
                  Jumlah barang
                </p>
                <p className="text-[#5D5E79] text-sm md:text-base">
                  {totalPrice.qty}pcs
                </p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-[#5D5E79] text-sm md:text-base">
                  Total harga barang
                </p>
                <p className="text-[#5D5E79] text-sm md:text-base">
                  Rp{totalPrice.total.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#5D5E79] text-sm md:text-base">
                  Biaya pengiriman
                </p>
                <p className="text-[#5D5E79] text-sm md:text-base">
                  Rp{totalCost.toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 mb-6 border-t-[1px] border-t-[#CECFD7]">
              <div className="px-6 flex justify-between">
                <p className="font-bold text-base md:text-lg">Total Bayar</p>
                <p className="font-bold text-base md:text-lg">
                  Rp{(totalPrice.total + totalCost).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            <div className="px-6">
              <button
                className={`w-full py-4 rounded-lg text-sm md:text-base ${
                  !selectedBank
                    ? "cursor-not-allowed text-[#B4B4B4] bg-gogreen-disabled"
                    : "cursor-pointer bg-gogreen text-white"
                }`}
                onClick={checkoutHandler}
                disabled={loading || !selectedBank}
              >
                {loading ? (
                  <Spinner size={"sm"} className={"mx-auto"} />
                ) : (
                  "Lanjut ke pembayaran"
                )}
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="thisismetode customcontainer mx-auto mb-24 px-6 md:px-0 mt-6 md:mt-0">
        <h3 className="font-bold text-base md:text-lg mb-4">
          Metode Pembayaran
        </h3>
        <p className="font-bold mb-2 text-sm md:text-base">
          Bank Transfer (Manual)
        </p>
        <p className="mb-6 text-xs md:text-base">
          Anda dapat melakukan pembayaran melalui salah satu rekening berikut :
        </p>
        <div className="thisisbanklist flex flex-col md:flex-row mb-6">
          {bank.length !== 0 &&
            bank.map((item, index) => (
              <div className="flex items-center mr-10" key={item.id}>
                <label
                  htmlFor={item.bankName}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    id={item.bankName}
                    type="radio"
                    name="radio"
                    value={item.id}
                    className="hidden"
                    onClick={selectedBankHandler}
                  />
                  <span className="w-5 h-5 md:w-6 md:h-6 inline-block mr-4 rounded-full border border-[#AEAEBC]"></span>
                  <img
                    src={`/images/${
                      index === 0
                        ? "bca"
                        : index === 1
                        ? "bni"
                        : index === 2
                        ? "bri"
                        : index === 3
                        ? "mandiri"
                        : "bca"
                    }.png`}
                    alt={item.bankName}
                    className="w-2/3 md:flex-1"
                  />
                </label>
              </div>
            ))}
        </div>

        <p className="mb-5 font-medium text-base md:text-xl">
          Informasi rekening pembayaran
        </p>
        <div className="flex space-x-10 md:space-x-24">
          <div>
            <p className="font-medium text-base md:text-xl mb-1">Nama Bank</p>
            <p className="font-medium text-base md:text-xl mb-1">
              Nomor Rekening
            </p>
            <p className="font-medium text-base md:text-xl mb-1">
              Nama Penerima
            </p>
          </div>
          {bank.length !== 0 &&
            bank.map((item) => (
              <div
                key={item.id}
                className={`${selectedBank === item.id ? "block" : "hidden"}`}
              >
                <p className="font-medium text-base md:text-xl mb-1">
                  {item.bankName}
                </p>
                <p className="font-medium text-base md:text-xl mb-1">
                  {item.bankNumber}
                </p>
                <p className="font-medium text-base md:text-xl mb-1">
                  {item.bankHolder}
                </p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Checkout;
