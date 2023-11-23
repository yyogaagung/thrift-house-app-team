import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";

const StoreCard = ({ oneStore }) => {
  const { id } = useSelector((state) => state.login);
  const [hasFavStore, setHasFavStore] = useState(true);

  const handleHapusFav = () => {
    axios
      .post(
        `https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/stores/favorites`,
        {
          storeId: oneStore.id,
        }
      )
      .then((res) => console.log(res.data.data))
      .catch((err) => console.log(err));

    setHasFavStore((prev) => !prev);
  };

  return (
    <>
      <div className="customcontainer mx-auto shadow-sm shadow-black-rgba rounded-md mb-10 p-2 box-border">
        <div className="wrap--desctoko place-content-center lg:pl-14">
          <div className="grid-bio flex justify-center items-center p-3">
            <div className="flex justify-center items-center rounded-full w-14 h-14  mr-5">
              <img className="w-full " src={oneStore.photo} alt="logo toko" />
            </div>
            <div>
              <p className="text-sm font-semibold">{oneStore.name}</p>
              <p className="text-sm lg:text-base lg:font-light font-extralight">
                {oneStore.city}, {oneStore.province}{" "}
              </p>
            </div>
          </div>

          <div className="grid-desc">
            <ul className="lg:w-full flex flex-wrap justify-start  items-center py-5 px-2 md:p-3 ">
              <li className="mr-0 sm:mr-5">
                <div className="flex">
                  <img
                    className="mr-2"
                    src="/images/shopping-bag.png"
                    alt="shopping bag here"
                  />
                  <p className="text-sm lg:font-semibold sm:font-medium">
                    Total Product
                  </p>
                </div>
                <p className=" mx-16 font-extralight text-sm">
                  {oneStore.totalProduct}
                </p>
              </li>
              <li className=" mr-5">
                <div className="flex">
                  <img
                    className="mr-2"
                    src="/images/icon-like.png"
                    alt="shopping like here"
                  />
                  <p className="text-sm lg:font-semibold sm:font-medium">
                    Total Favorite
                  </p>
                </div>
                <p className=" mx-16 font-extralight text-sm">
                  {oneStore.totalFavorite}
                </p>
              </li>
              <li className="md:mr-5">
                <div className="flex">
                  <img
                    className="mr-2"
                    src="/images/rate-review.png"
                    alt="shopping review here"
                  />
                  <p className="text-sm lg:font-semibold sm:font-medium">
                    Total Review
                  </p>
                </div>
                <p className=" mx-16  font-extralight text-sm">
                  {oneStore.totalReview}
                </p>
              </li>
              <li className="md:mr-5">
                <div className="flex">
                  <img
                    className="mr-2"
                    src="/images/star.png"
                    alt="shopping review here"
                  />
                  <p className="text-sm lg:font-semibold sm:font-medium">
                    Rata-Rata Review
                  </p>
                </div>
                <p className=" mx-16 font-extralight text-sm">
                  {oneStore.averageReview}
                </p>
              </li>
            </ul>
          </div>

          <div className="grid-btn flex flex-col justify-evenly items-center">
            {hasFavStore ? (
              <p
                to={"/toko"}
                onClick={handleHapusFav}
                className="rounded w-auto h-auto border-2 text-xs lg:text-sm cursor-pointer border-gogreen text-gogreen py-2 px-3 hover:bg-gogreen hover:text-white "
              >
                Hapus Favorite
              </p>
            ) : (
              <p
                to={"/toko"}
                //   onClick={"handleTambahFav"}
                className="rounded w-auto h-auto bg-gogreen text-xs lg:text-sm text-white py-2 px-3 hover:bg-gogreen cursor-pointer"
              >
                Jadikan Favorite
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreCard;
