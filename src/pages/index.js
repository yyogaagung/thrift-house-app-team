import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard";
import { InlineIcon } from "@iconify/react";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";

const Home = () => {
  const [dataPria, setDataPria] = useState([]);
  const [dataWanita, setDataWanita] = useState([]);
  const [dataAnak, setDataAnak] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://thrifthouse.herokuapp.com/api/v1/products?category=pria&size=8"
      )
      .then((res) => {
        setDataPria(res.data.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });

    axios
      .get(
        "https://thrifthouse.herokuapp.com/api/v1/products?category=wanita&size=8"
      )
      .then((res) => {
        setDataWanita(res.data.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });

    axios
      .get(
        "https://thrifthouse.herokuapp.com/api/v1/products?category=anak&size=8"
      )
      .then((res) => {
        setDataAnak(res.data.data.products);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, []);
  return (
    <>
      <Banner />

      <section className="customcontainer mx-auto mb-16 px-6 lg:px-0">
        <div className="flex justify-between mb-5">
          <p className="font-bold sm:font-medium text-sm sm:text-xl">Pria</p>
          <Link to="/pria" className="flex items-center">
            <span className="mr-1 sm:mr-3 font-medium text-[10px] sm:text-lg">
              Lihat Semua
            </span>
            <InlineIcon icon="akar-icons:chevron-right" height="16" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 lg:gap-10 justify-items-center sm:grid-cols-3 md:grid-cols-4">
          {/* <div className="flex justify-center flex-wrap gap-6"> */}
          {isLoading && (
            <div className="text-center col-span-4">
              <Spinner />
            </div>
          )}
          {isError && (
            <div className="text-center col-span-4">Something went wrong</div>
          )}
          {dataPria.map((e) => (
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
      </section>

      <section className="customcontainer mx-auto mb-16 px-6 lg:px-0">
        <div className="flex justify-between mb-5">
          <p className="font-bold sm:font-medium text-sm sm:text-xl">Wanita</p>
          <Link to="/wanita" className="flex items-center">
            <span className="mr-1 sm:mr-3 font-medium text-[10px] sm:text-lg">
              Lihat Semua
            </span>
            <InlineIcon icon="akar-icons:chevron-right" height="16" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:gap-10 justify-items-center md:grid-cols-3 lg:grid-cols-4">
          {isLoading && (
            <div className="text-center col-span-4">
              <Spinner />
            </div>
          )}
          {isError && (
            <div className="text-center col-span-4">Something went wrong</div>
          )}
          {dataWanita.map((e) => (
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
      </section>

      <section className="customcontainer mx-auto mb-16 px-6 lg:px-0">
        <div className="flex justify-between mb-5">
          <p className="font-bold sm:font-medium text-sm sm:text-xl">
            Anak-anak
          </p>
          <Link to="/anak" className="flex items-center">
            <span className="mr-1 sm:mr-3 font-medium text-[10px] sm:text-lg">
              Lihat Semua
            </span>
            <InlineIcon icon="akar-icons:chevron-right" height="16" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-6 lg:gap-10 justify-items-center md:grid-cols-3 lg:grid-cols-4">
          {isLoading && (
            <div className="text-center col-span-4">
              <Spinner />
            </div>
          )}
          {isError && (
            <div className="text-center col-span-4">Something went wrong</div>
          )}
          {dataAnak.map((e) => (
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
      </section>
    </>
  );
};

export default Home;
