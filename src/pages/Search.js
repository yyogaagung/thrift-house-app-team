import axios from "axios";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import Select from "react-select";
import FilterAccordion from "../components/FilterAccordion";
import { useLocation } from "react-router-dom";
import { DebounceInput } from "react-debounce-input";

export default function Search() {
  const [data, setData] = useState([]);
  const [filters, setFilters] = useState({});
  const [qty, setQty] = useState(0);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("latest");
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingNewPage, setIsLoadingNewPage] = useState(false);
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const IndicatorSeparator = ({ innerProps }) => {
    return <span className="bg-transparent" {...innerProps} />;
  };

  useEffect(() => {
    const params = new URLSearchParams(search);
    setIsLoading(true);
    axios
      .get("https://thrifthouse.herokuapp.com:443/api/v1/products", {
        params: {
          size: 9,
          search: params.get("search"),
        },
      })
      .then((response) => {
        setData(response.data.data.products);
        setQty(response.data.data.totalItems);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });

    axios
      .get("https://thrifthouse.herokuapp.com:443/api/v1/products/filters")
      .then((response) => {
        const { categories: Kategori, brands: Brand, sizes: Ukuran, conditions: Kondisi } = response.data.data;
        const filter = { Kategori, Brand, Ukuran, Kondisi };
        setFilters(filter);
        console.log(filter);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search]);

  const handleFilter = (e, key, value) => {
    switch (key) {
      case "Kategori":
        key = "category";
        break;
      case "Brand":
        key = "brand";
        break;
      case "Ukuran":
        key = "sizeProduct";
        break;
      case "Kondisi":
        key = "condition";
        break;
      default:
        break;
    }

    const newFilter = {
      ...filter,
    };
    const { checked } = e.target;
    let newMinPrice = minPrice;
    let newMaxPrice = maxPrice;
    const newSort = sort;

    if (!(newFilter[key] instanceof Array)) {
      newFilter[key] = [];
    }
    if (checked) {
      newFilter[key] = [...newFilter[key], value];
      setFilter(newFilter);
    } else {
      newFilter[key] = newFilter[key].filter((filter) => {
        return filter !== value;
      });
      setFilter(newFilter);
    }
    setIsLoading(true);

    axios
      .get("https://thrifthouse.herokuapp.com:443/api/v1/products", {
        params: {
          size: 9,
          search: params.get("search"),
          category: newFilter["category"]?.length > 0 ? newFilter["category"]?.join(",") : null,
          brand: newFilter["brand"]?.length > 0 ? newFilter["brand"]?.join(",") : null,
          sizeProduct: newFilter["sizeProduct"]?.length > 0 ? newFilter["sizeProduct"]?.join(",") : null,
          condition: newFilter["condition"]?.length > 0 ? newFilter["condition"]?.join(",") : null,
          priceDown: newMinPrice,
          priceUp: newMaxPrice,
          sortBy: newSort,
        },
      })
      .then((response) => {
        setData(response.data.data.products);
        setQty(response.data.data.totalItems);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleChange = (value, type) => {
    const newFilter = {
      ...filter,
    };
    let newMinPrice = minPrice;
    let newMaxPrice = maxPrice;
    if (type === "min") {
      newMinPrice = value;
      setMinPrice(newMinPrice);
    } else {
      newMaxPrice = value;
      setMaxPrice(newMaxPrice);
    }
    axios
      .get("https://thrifthouse.herokuapp.com:443/api/v1/products", {
        params: {
          size: 9,
          search: params.get("search"),
          category: newFilter["category"]?.length > 0 ? newFilter["category"]?.join(",") : null,
          brand: newFilter["brand"]?.length > 0 ? newFilter["brand"]?.join(",") : null,
          sizeProduct: newFilter["sizeProduct"]?.length > 0 ? newFilter["sizeProduct"]?.join(",") : null,
          condition: newFilter["condition"]?.length > 0 ? newFilter["condition"]?.join(",") : null,
          priceDown: newMinPrice,
          priceUp: newMaxPrice,
          sortBy: sort,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data.data.products);
        setQty(response.data.data.totalItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete = () => {
    setFilter({});
    setMinPrice(null);
    setMaxPrice(null);
    setIsLoading(true);
    axios
      .get("https://thrifthouse.herokuapp.com:443/api/v1/products", {
        params: {
          size: 9,
          search: params.get("search"),
          sortBy: sort,
        },
      })
      .then((response) => {
        setData(response.data.data.products);
        setQty(response.data.data.totalItems);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleChecked = (key, value) => {
    switch (key) {
      case "Kategori":
        key = "category";
        break;
      case "Brand":
        key = "brand";
        break;
      case "Ukuran":
        key = "sizeProduct";
        break;
      case "Kondisi":
        key = "condition";
        break;
      default:
        break;
    }
    return filter[key] ? filter[key].includes(value) : false;
  };

  const handleSort = (e) => {
    const newFilter = {
      ...filter,
    };
    let newMinPrice = minPrice;
    let newMaxPrice = maxPrice;
    const newSort = e.value;
    setSort(newSort);
    axios
      .get("https://thrifthouse.herokuapp.com:443/api/v1/products", {
        params: {
          size: 9,
          search: params.get("search"),
          category: newFilter["category"]?.length > 0 ? newFilter["category"]?.join(",") : null,
          brand: newFilter["brand"]?.length > 0 ? newFilter["brand"]?.join(",") : null,
          sizeProduct: newFilter["sizeProduct"]?.length > 0 ? newFilter["sizeProduct"]?.join(",") : null,
          condition: newFilter["condition"]?.length > 0 ? newFilter["condition"]?.join(",") : null,
          priceDown: newMinPrice,
          priceUp: newMaxPrice,
          sortBy: newSort,
        },
      })
      .then((response) => {
        setData(response.data.data.products);
        setQty(response.data.data.totalItems);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePage = () => {
    const newFilter = {
      ...filter,
    };
    let newMinPrice = minPrice;
    let newMaxPrice = maxPrice;
    const newSort = sort;
    const newPage = data.length / 9;
    setIsLoadingNewPage(true);
    axios
      .get("https://thrifthouse.herokuapp.com:443/api/v1/products", {
        params: {
          size: 9,
          search: params.get("search"),
          category: newFilter["category"]?.length > 0 ? newFilter["category"]?.join(",") : null,
          brand: newFilter["brand"]?.length > 0 ? newFilter["brand"]?.join(",") : null,
          sizeProduct: newFilter["sizeProduct"]?.length > 0 ? newFilter["sizeProduct"]?.join(",") : null,
          condition: newFilter["condition"]?.length > 0 ? newFilter["condition"]?.join(",") : null,
          priceDown: newMinPrice,
          priceUp: newMaxPrice,
          sortBy: newSort,
          page: newPage,
        },
      })
      .then((response) => {
        console.log(response);
        const newData = [...data, ...response.data.data.products];
        setData(newData);
        setIsLoadingNewPage(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto">
      <div className="font-medium text-sm px-6 lg:p-6 lg:text-2xl">
        <p>Hasil pencarian untuk : “{params.get("search")}”</p>
      </div>
      <div className="">
        <div className="grid grid-cols-2 gap-y-4 gap-x-6 mt-4 lg:mt-0 lg:grid-cols-5 lg:px-20 px-6">
          <FilterAccordion
            title="Filter"
            className="mt-0 relative"
            classButton="lg:hidden focus:ring-2 focus:ring-[#4DB680]"
            classContent="absolute overflow-scroll lg:overflow-hidden z-[15] top-11 w-full lg:top-0 lg:w-48 lg:self-end lg:!max-h-fit"
            content={
              <div className="border border-[#AEAEBC] rounded-lg px-2 pb-4 lg:px-6 lg:pb-4 bg-white">
                <div className="hidden lg:flex justify-between items-center mt-4">
                  <p className="text-sm font-bold">Filter</p>
                  <button onClick={handleDelete} className="text-[#AEAEBC] text-[10px] hover:text-[#D8421D]">
                    Hapus Semua
                  </button>
                </div>
                {Object.keys(filters).map((key) => (
                  <FilterAccordion
                    key={key}
                    title={key}
                    content={
                      <ul className="flex flex-col gap-2 mt-2">
                        {filters[key].map((value, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <input id={value} onChange={(e) => handleFilter(e, key, value)} checked={handleChecked(key, value)} type="checkbox" className="accent-[#29A867]" />
                            <label htmlFor={value}>{value.charAt(0).toUpperCase() + value.slice(1)}</label>
                          </li>
                        ))}
                      </ul>
                    }
                  />
                ))}
                <FilterAccordion
                  title={"Harga"}
                  content={
                    <div className="flex items-center gap-2 mt-1 text-[10px]">
                      <DebounceInput
                        debounceTimeout={500}
                        id="minPrice"
                        onChange={(e) => handleChange(e.target.value !== "0" ? e.target.value : null, "min")}
                        value={minPrice ? minPrice : ""}
                        min="1"
                        type="number"
                        className="p-2 border rounded-lg w-1 basis-1/2"
                        placeholder="Min."
                      />
                      <div className="w-2 h-px bg-[#b4b4b4]" />
                      <DebounceInput
                        debounceTimeout={500}
                        id="maxPrice"
                        onChange={(e) => handleChange(e.target.value !== "0" ? e.target.value : null, "max")}
                        value={maxPrice ? maxPrice : ""}
                        min="1"
                        type="number"
                        className="p-2 border rounded-lg w-1 basis-1/2"
                        placeholder="Max."
                      />
                    </div>
                  }
                />
              </div>
            }
          />

          <div className="flex justify-center lg:justify-between items-center lg:col-span-4">
            <p className="font-medium hidden lg:block">{qty} Produk</p>
            <div className="flex items-center gap-2 text-[10px] w-full lg:w-64">
              <p className="text-[#AEAEBC] hidden lg:block">Urutkan</p>
              <Select
                isSearchable={false}
                placeholder={"Urutkan"}
                components={{ IndicatorSeparator }}
                onChange={handleSort}
                options={[
                  { label: "Harga Tinggi ke Rendah", value: "highest" },
                  { label: "Harga Rendah ke Tinggi", value: "lowest" },
                  { label: "Produk Terbaru", value: "latest" },
                ]}
                menuPosition={"absolute"}
                styles={{
                  container: (base) => ({
                    ...base,
                    width: "100%",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 15,
                  }),
                  control: (base, { isFocused, isSelected }) => ({
                    ...base,
                    borderRadius: "8px",
                    width: "100%",
                    borderColor: isFocused || isSelected ? "#4DB680" : undefined,
                    boxShadow: isFocused || isSelected ? "0 0 0 1px #4DB680" : undefined,
                    "&:hover": { borderColor: isFocused ? "#4DB680" : undefined },
                  }),
                  option: (base, { isFocused, isSelected }) => ({
                    ...base,
                    backgroundColor: isSelected ? "#4DB680" : isFocused ? "#4DB68020" : undefined,
                  }),
                  dropdownIndicator: (base, state) => ({
                    ...base,
                    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: "12px",
                  }),
                }}
              />
            </div>
          </div>
          {isLoading ? (
            <div className="w-full lg:p-52 my-40 flex justify-center items-center col-span-2 lg:col-span-4 lg:col-start-2">
              <div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin "></div>
            </div>
          ) : data.length > 0 ? (
            <section className="customcontainer mx-auto mb-16 lg:px-0 grid col-span-2 lg:col-span-4 lg:col-start-2">
              <div className="grid grid-cols-2 gap-6 justify-items-center md:grid-cols-3 lg:grid-cols-3 2xl:grid-cols-4 lg:min-h-screen">
                {data.map((response) => (
                  <ProductCard
                    id={response.id}
                    key={response.id}
                    name={response.name}
                    brand={response.brand}
                    size={response.size}
                    condition={response.condition}
                    price={response.price}
                    photos={response.photos}
                    category={response.category}
                  />
                ))}
              </div>
              {isLoadingNewPage ? (
                <div className="mt-6 w-fit mx-auto py-[10px]">
                  <div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin "></div>
                </div>
              ) : qty <= data.length ? (
                <></>
              ) : (
                <button onClick={handlePage} className="mt-6 text-lg text-center rounded-lg text-white bg-[#4DB680] w-full lg:max-w-xs lg:mx-auto py-[10px]">
                  Lihat Lainnya
                </button>
              )}
            </section>
          ) : (
            <div className="flex flex-col lg:col-start-2 items-center col-span-2 lg:col-span-4 w-full mb-20">
              <img src="/images/search-not-found.png" className="max-w-xs" alt="search-not-found" />
              <p className="text-[#B4B4B4] font-medium text-center text-xs md:text-sm lg:text-lg mt-4">Maaf barang yang kamu cari tidak ada</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
