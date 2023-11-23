import { InlineIcon } from "@iconify/react";
import { useState } from "react";
import ProductFav from "../components/favorite/ProductFav";
import StoreFav from "../components/favorite/StoreFav";

const Favorite = () => {
  const [tabs, setTabs] = useState("Produk Favorit");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // handle tab change
  const tabsHandler = (e) => {
    // console.log(e.target.textContent);
    setTabs(e.target.textContent);
  };

  // handle filter open
  const filterHandler = () => setIsFilterOpen((prev) => !prev);

  return (
    <div className="customcontainer mx-auto my-7 px-6 sm:px-0">
      <div className="thisistabs flex mb-10">
        <div
          className={`p-[10px] sm:px-7 sm:py-4 text-xs sm:text-xl cursor-pointer ${
            tabs === "Produk Favorit"
              ? "text-gogreen border-b-[1px] border-b-gogreen"
              : "text-[#AEAEBC]"
          } `}
          onClick={tabsHandler}
        >
          Produk Favorit
        </div>
        <div
          className={`p-[10px] sm:px-7 sm:py-4 text-xs sm:text-xl cursor-pointer ${
            tabs === "Toko Favorit"
              ? "text-gogreen border-b-[1px] border-b-gogreen"
              : "text-[#AEAEBC]"
          }`}
          onClick={tabsHandler}
        >
          Toko Favorit
        </div>
      </div>

      <div className="thisisfiltercontainer flex items-center justify-between mb-10">
        <div className="thisissearch border-[1px] border-[#CFCFCF] py-[10px] sm:py-[14px] px-[11px] sm:px-[21px] rounded-md flex items-center space-x-2 mr-6 w-2/3 sm:w-1/3">
          <span className="inline">
            <InlineIcon
              icon="akar-icons:search"
              color="#CFCFCF"
              height="24"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </span>
          <form className="w-full">
            <input
              type="text"
              placeholder="Cari produk favoritmu"
              className=" placeholder:text-[#CFCFCF] placeholder:text-sm sm:placeholder:text-base focus:outline-none w-full"
            />
          </form>
        </div>

        <div className="thisisfilter flex items-center">
          <div className="mr-8 font-medium text-[#B4B4B4] hidden sm:block">
            Urutkan
          </div>
          <div className="relative">
            <InlineIcon
              icon="ph:arrows-down-up-fill"
              height="24"
              className="sm:hidden"
              onClick={filterHandler}
            />
            <div
              className={`px-4 py-[14px] border-[1px] border-gogreen rounded-lg cursor-pointer text-gogreen arrowgreen bg-white z-30 relative hidden sm:flex items-center ${
                isFilterOpen === true ? "arrowreverse" : ""
              }`}
              onClick={filterHandler}
            >
              Terbaru Disimpan
            </div>
            <ul
              className={`${
                isFilterOpen === true ? "absolute" : "hidden"
              } sm:w-full text-center bg-white border-[1px] border-gogreen rounded-lg sm:pt-5 top-8 right-0 z-20`}
            >
              <li className="py-[14px] cursor-pointer hover:text-gogreen text-xs sm:text-base px-5 whitespace-nowrap">
                Terbaru Disimpan
              </li>
              <li className="py-[14px] cursor-pointer hover:text-gogreen text-xs sm:text-base px-5 whitespace-nowrap">
                Terakhir Disimpan
              </li>
              <li className="py-[14px] cursor-pointer hover:text-gogreen text-xs sm:text-base px-5 whitespace-nowrap">
                Abjad Awal (A-Z)
              </li>
              <li className="py-[14px] cursor-pointer hover:text-gogreen text-xs sm:text-base px-5 whitespace-nowrap">
                Abjad Akhir (Z-A)
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* render fav content */}
      {tabs === "Produk Favorit" ? <ProductFav /> : <StoreFav />}
    </div>
  );
};

export default Favorite;
