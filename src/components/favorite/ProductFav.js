import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import Spinner from "../Spinner";

const ProductFav = () => {
  const [productFav, setProductFav] = useState([]);
  const { id } = useSelector((state) => state.login);
  const [loading, setLoading] = useState(false);

  // get favorite product
  useEffect(() => {
    axios
      .get(
        `https://thrifthouse.herokuapp.com/api/v1/users/${id}/products/favorites?size=8&page=0`
      )
      .then((res) => setProductFav(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  // handle load more
  const loadMoreHandler = () => {
    const page = productFav.currentPage + 1;
    setLoading(true);
    axios
      .get(
        `https://thrifthouse.herokuapp.com/api/v1/users/${id}/products/favorites?size=8&page=${page}`
      )
      .then((res) => {
        setProductFav((prev) => ({
          ...res.data.data,
          products: [...prev.products, ...res.data.data.products],
        }));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      {productFav.length === 0 ? (
        <Spinner className={"mx-auto mb-24"} />
      ) : (
        <>
          {productFav.products.length === 0 ? (
            <div className="flex flex-col items-center my-28">
              <div className="mb-4">
                <img
                  src="/images/favEmptyProduct.jpg"
                  alt="favEmptyProduct"
                  className="w-[160px] sm:w-full"
                />
              </div>
              <div className="text-center font-medium text-[10px] sm:text-2xl text-[#B4B4B4]">
                <p>Produk favoritmu masih kosong</p>
                <p>Coba lihat produk lainnya</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 gap-6 lg:gap-10 justify-items-center sm:grid-cols-3 md:grid-cols-4 mb-10">
                {productFav.products.map((e) => (
                  <ProductCard
                    id={e.id}
                    key={e.id}
                    name={e.name}
                    brand={e.brand}
                    size={e.size}
                    condition={e.condition}
                    price={e.price}
                    photos={e.photos}
                    category={e.category}
                  />
                ))}
              </div>
              <div className="text-center mb-24">
                {productFav.currentPage < productFav.totalPages - 1 && (
                  <button
                    className="py-3 bg-gogreen rounded-lg text-white w-[275px] mx-auto"
                    onClick={loadMoreHandler}
                    disabled={loading}
                  >
                    {loading ? (
                      <Spinner size={"sm"} className={"mx-auto"} />
                    ) : (
                      "Lihat Lainnya"
                    )}
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

export default ProductFav;
