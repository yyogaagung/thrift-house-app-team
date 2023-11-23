import axios from "axios";
import { InlineIcon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import groupBy from "../utils/objectGrouping";
import { checkoutAdd } from "../action";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { access_token: accessToken, id: userId } = useSelector(
    (state) => state.login
  );
  const [cartProduct, setCartProduct] = useState([]);
  const [deletedIds, setDeletedIds] = useState([]);
  const [isDisplay, setIsDisplay] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [qty, setQty] = useState(0);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const checkoutHandler = (e) => {
    e.preventDefault();
    let data = [];
    let result = [];
    let holdKey = {};
    const selectedProduct = cartProduct.filter((item) => item.isChecked);

    // arrange data to look like result from fetching product detail
    selectedProduct.forEach((item) => {
      const { store, ...product } = item;
      const temp = { product: { ...product }, store: { ...item.store } };
      data = [...data, temp];
    });

    // grouping based on store
    data.forEach((item) => {
      let temp = {};
      if (Object.values(holdKey).indexOf(item.store.id) === -1) {
        holdKey[item.store.id] = item.store.id;
        temp = { store: { ...item.store }, product: [{ ...item.product }] };
        result = [...result, temp];
      } else {
        result.forEach((resultItem) => {
          if (resultItem.store.id === item.store.id) {
            resultItem.product.push({ ...item.product });
          }
        });
      }
    });

    dispatch(checkoutAdd(result));
    navigate("/keranjang/checkout");
  };

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    setIsLoading(true);
    axios
      .get(
        `https://thrifthouse.herokuapp.com/api/v1/users/${userId}/cart`,
        config
      )
      .then((response) => {
        const body = response.data.data;
        setCartProduct(body);
        setIsLoading(false);
        console.log(body);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [accessToken, userId]);

  function handleDelete(e, products) {
    e.preventDefault();
    if (products instanceof Array) {
      console.log(products);
      const newDeletedIds = products
        .filter((product) => product?.isChecked === true)
        .map((product) => product.id);
      setDeletedIds(newDeletedIds);
      setIsDisplay(true);
    } else {
      setDeletedIds([products.id]);
      setIsDisplay(true);
    }
  }

  const handleDeleted = (e, newDeletedIds) => {
    e.preventDefault();
    const config = {
      data: {
        productIds: newDeletedIds,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
    axios
      .delete(
        `https://thrifthouse.herokuapp.com/api/v1/users/${userId}/cart`,
        config
      )
      .then((response) => {
        const newList = cartProduct.filter(
          (product) => !newDeletedIds.includes(product.id)
        );
        setCartProduct(newList);
        setDeletedIds([]);
        setIsDisplay(false);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
        setDeletedIds([]);
        setIsDisplay(false);
      });
  };

  const handleCheckList = (e) => {
    const { checked, name } = e.target;
    let checkList = cartProduct;
    if (name === "selectAll") {
      checkList = cartProduct.map((value) => {
        return {
          ...value,
          isChecked: checked,
        };
      });
      setCartProduct(checkList);
    } else if (name === "selectGroup") {
      const { id } = e.target;
      checkList = cartProduct.map((value) => {
        return value.store.id === id
          ? {
              ...value,
              isChecked: checked,
            }
          : value;
      });
      setCartProduct(checkList);
    } else {
      checkList = cartProduct.map((value) => {
        return value.id === name
          ? {
              ...value,
              isChecked: checked,
            }
          : value;
      });
      setCartProduct(checkList);
    }
    if (atLeastOneChecked(checkList)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
    setQty(
      checkList.reduce((prev, product) => {
        return product.isChecked ? prev + 1 : prev;
      }, 0)
    );
    setTotal(
      checkList.reduce((prev, product) => {
        return product.isChecked ? prev + product.price : prev;
      }, 0)
    );
  };

  const atLeastOneChecked = (checkedCartProduct) => {
    return checkedCartProduct.some((product) => {
      return product.isChecked === true;
    });
  };

  function deleteModal() {
    return (
      <div className="bg-black-rgba fixed flex z-50 top-0 bottom-0 left-0 right-0 p-6">
        <div className="bg-white rounded-lg m-auto text-center overflow-hidden">
          <div className=" px-14 pt-7 pb-6">
            <p className="font-bold text-sm mb-2">Hapus produk?</p>
            <p className="text-xs">
              Produk yang dihapus akan hilang dari keranjang.
            </p>
          </div>
          <div className="flex">
            <button
              type="button"
              onClick={(e) => setIsDisplay(!isDisplay)}
              className="flex-grow py-4 text-xs font-medium border-[0.3px] hover:bg-gray-100"
            >
              Batalkan
            </button>
            <button
              onClick={(e) => handleDeleted(e, deletedIds)}
              className="flex-grow py-4 text-xs font-medium border-[0.3px] hover:bg-gray-100"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    );
  }

  function groupProduct(cartProduct) {
    const group = groupBy(cartProduct, "store.id");
    return Object.keys(group).map((value, index) => {
      const products = group[value];
      return (
        <div
          key={index}
          className="p-6 border-t-4 border-[#F2F2F2] lg:px-0 lg:border lg:shadow-md lg:rounded-lg"
        >
          <div className="flex items-center lg:ml-3">
            <input
              type="checkbox"
              onChange={(e) => handleCheckList(e)}
              name="selectGroup"
              id={value}
              checked={!products.some((product) => product?.isChecked !== true)}
              className="w-5 h-5 accent-[#29A867]"
            />
            <img
              src={products[0].store.photo}
              alt="seller"
              className="w-7 ml-4 lg:w-12"
            />
            <p className="text-xs font-bold ml-2 lg:text-base lg:ml-4">
              {products[0].store.name}
            </p>
          </div>
          <hr className="hidden mt-4 lg:block" />
          {products.map((value, index) => (
            <div key={index} className="mt-4 flex justify-between lg:mx-3">
              <div className="flex items-center lg:gap-4 lg:flex-grow">
                <input
                  type="checkbox"
                  onChange={(e) => handleCheckList(e)}
                  name={value.id}
                  checked={value?.isChecked || false}
                  className="w-5 h-5 accent-[#29A867]"
                />
                <img
                  src={value.photo}
                  alt="product"
                  className="w-16 ml-4 lg:ml-0"
                />
                <div className="ml-3 lg:grid lg:grid-cols-3 lg:ml-0 gap-4 items-center lg:max-w-sm xl:max-w-lg lg:w-full">
                  <div>
                    <p className="font-bold text-sm lg:text-base lg:truncate">
                      {value.brand}
                    </p>
                    <p className="text-xs lg:text-sm lg:truncate">
                      {value.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-2.5 lg:flex-col-reverse lg:items-start">
                    <p className="bg-[#F2F2F2] rounded px-2 py-0.5 text-xs text-[#8F8F8F]">
                      {value.condition}
                    </p>
                    <p className="bg-[#F2F2F2] rounded px-2 py-0.5 text-xs text-[#8F8F8F]">
                      {value.size}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-[#29A867] lg:text-lg">
                    Rp {value.price?.toLocaleString("id-ID")}{" "}
                  </p>
                </div>
              </div>

              <button
                onClick={(e) => handleDelete(e, value)}
                id={value.id}
                className="justify-self-end hidden lg:block"
              >
                <InlineIcon
                  icon={"ph:trash-fill"}
                  className="text-[#FD622A] block h-[18px] lg:w-6 lg:h-6"
                />
              </button>
            </div>
          ))}
        </div>
      );
    });
  }

  return isLoading ? (
    <div className="w-full lg:p-52 my-40 flex justify-center items-center ">
      <div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin "></div>
    </div>
  ) : cartProduct.length === 0 ? (
    <div className="flex flex-col items-center text-center p-16">
      {/* cart kosong */}
      <img
        src="/images/empty-cart.png"
        alt="empty-cart"
        className="w-40 lg:w-52"
      />
      <p className="text-xs text-[#B4B4B4] mt-5 w-[230px] xl:text-sm xl:w-[270px]">
        Keranjang kamu masih kosong nih Yuk isi dengan produk Thrift pilihanmu
      </p>
      <a
        href="/"
        className="h-11 mt-5 py-3 px-4 bg-[#4DB680] text-sm text-white rounded-lg lg:w-64 xl:w-80 xl:text-base xl:h-12"
      >
        Yuk, Belanja sekarang
      </a>
    </div>
  ) : (
    <form className="w-full 2xl:m-auto 2xl:max-w-screen-2xl">
      <div className="flex flex-col lg:flex-row lg:gap-6 lg:px-20 lg:py-14 lg:justify-between">
        <div className="flex flex-col lg:gap-6 lg:w-full">
          <div className="flex justify-between p-6 border-t-4 border-[#F2F2F2] lg:px-3 lg:border lg:shadow-md lg:rounded-lg">
            <div className="flex items-center">
              <input
                onChange={(e) => handleCheckList(e)}
                checked={
                  !cartProduct.some((product) => product?.isChecked !== true)
                }
                name="selectAll"
                id="cart-select-all"
                type="checkbox"
                className="w-5 h-5 accent-[#29A867]"
              />
              <label
                htmlFor="cart-select-all"
                className="font-medium text-xs ml-4"
              >
                Pilih Semua
              </label>
            </div>
            <button
              disabled={!isChecked}
              className="text-[#FD622A] text-xl lg:text-2xl disabled:hidden "
              onClick={(e) => handleDelete(e, cartProduct)}
            >
              <InlineIcon icon={"ph:trash-fill"} className="" />
            </button>
          </div>

          {/* card cart */}

          {groupProduct(cartProduct)}
        </div>

        <div className="px-6 lg:px-0 lg:min-w-[280px] xl:min-w-[370px]">
          <div className="p-6 border rounded-lg shadow-md mb-6 lg:mb-0">
            <h2 className="font-bold">Ringkasan Belanja</h2>
            <div className="flex text-sm mt-4">
              <h3>Jumlah Barang</h3>
              <span className="ml-auto">{qty} pcs</span>
            </div>
            <div className="flex text-sm mt-4">
              <h3>Total Harga Barang</h3>
              <span className="ml-auto">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
            <hr className="mt-5" />
            <div className="flex font-bold mt-5">
              <h3>Total Bayar</h3>
              <span className="ml-auto text-[#29A867]">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>
            <button
              disabled={!isChecked}
              type="submit"
              onClick={checkoutHandler}
              className="h-11 w-full mt-5 py-3 bg-[#4DB680] text-sm text-white rounded-lg disabled:bg-[#F2F2F2] disabled:text-[#B4B4B4]"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      {isDisplay && deleteModal()}
    </form>
  );
}
