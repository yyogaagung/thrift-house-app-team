import { InlineIcon } from "@iconify/react";
import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../../ProductCard";
import Spinner from "../../Spinner";

export default function ProductList(){
    const [productFromToko, setProductFromToko] = useState([]);
    // const [oneProduct, setOneProduct] = useState([]);
    const [storeId, setStoreId] = useState('')
    const [category, setCategory] = useState('')
    const [isLoading, setIsLoading] = useState(true);
    const [otherProduct, setOtherProduct] = useState([])
    const params  = useParams();

    useEffect(() => {
        axios.get(`https://thrifthouse.herokuapp.com/api/v1/products/${params.id}`)
        .then((respone) => {
            // setOneProduct(respone.data.data)
            setStoreId(respone.data.data.store.id)
            setCategory(respone.data.data.product.category)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })

        axios
          .get(
            `https://thrifthouse.herokuapp.com:443/api/v1/products?storeId=${storeId}&size=8`
          )
          .then((res) => {
            setProductFromToko(res.data.data.products);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
    
        axios
          .get(
            `https://thrifthouse.herokuapp.com:443/api/v1/products?category=${category}&size=8`
          )
          .then((res) => {
            setOtherProduct(res.data.data.products);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      }, [category, params.id, storeId] );
    

    
    return(
        <Fragment>
        <div className="mb-16">
        <section className="customcontainer mx-auto px-6 mb-16">
        <div className="flex justify-between mb-5">
          <p className="font-bold sm:font-medium text-sm sm:text-xl">Produk lain dari toko ini</p>
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
          {productFromToko.map((e) => (
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
        <section className="customcontainer mx-auto px-6 mb-16">
        <div className="flex justify-between mb-5">
          <p className="font-bold sm:font-medium text-sm sm:text-xl">Kamu mungkin juga suka</p>
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
          {otherProduct.map((e) => (
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

            
        </div>
            
        </Fragment>
    )
}