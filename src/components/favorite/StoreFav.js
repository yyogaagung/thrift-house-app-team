import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import StoreCard from "../StoreCard";
import Spinner from "../Spinner";

const StoreFav = () => {
  const [storeFav, setStoreFav] = useState([]);
  const { id } = useSelector((state) => state.login);

  // get favorite store
  useEffect(() => {
    axios
      .get(
        `https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/stores/favorites?size=8&page=0`
      )
      .then((res) => setStoreFav(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  // handle load more
  const loadMoreHandler = () => {
    const page = storeFav.currentPage + 1;
    axios
      .get(
        `https://thrifthouse.herokuapp.com/api/v1/users/${id}/stores/favorites?size=8&page=${page}`
      )
      .then((res) => {
        setStoreFav((prev) => ({
          ...res.data.data,
          stores: [...prev.stores, ...res.data.data.stores],
        }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {storeFav.length === 0 ? (
        <Spinner className={"mx-auto mb-24"} />
      ) : (
        <>
          {storeFav.stores.length === 0 ? (
            <div className="flex flex-col items-center my-28">
              <div className="mb-4">
                <img
                  src="/images/favEmptyStore.jpg"
                  alt="favEmptyStore"
                  className="w-[160px] sm:w-full"
                />
              </div>
              <div className="text-center font-medium text-[10px] sm:text-2xl text-[#B4B4B4]">
                <p>Toko favoritmu masih kosong nih</p>
                <p>Cek toko sebelah</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                {storeFav.stores.map((e) => (
                  <StoreCard key={e.id} oneStore={e} />
                ))}
              </div>
              <div className="text-center mb-24">
                {storeFav.currentPage < storeFav.totalPages - 1 && (
                  <button
                    className="py-3 bg-gogreen rounded-lg text-white w-[275px] mx-auto"
                    onClick={loadMoreHandler}
                  >
                    Lihat Lainnya
                  </button>
                )}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default StoreFav;
