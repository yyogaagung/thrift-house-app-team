import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import ProductCard from "../ProductCard";

export default function Pria(){
    const [isLoading, setIsLoading] = useState(false);
    const [pria, setPria]=useState([]);
    const [page, setPage]=useState(0)
    const [category]=useState("pria")
    const [totalProduct, setTotalProduct] = useState(0)
    const params = useParams();

    const fetchData = async () => {
        setIsLoading(true)
        const url = `https://thrifthouse.herokuapp.com:443/api/v1/products?category=${category}&storeId=${params.id}&page=${page}&size=8`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          setTotalProduct(data.data.totalItems);
            setPria((oldMovies) => {
              if (page === 0) {
                return data.data.products;
              } else {
                return [...oldMovies, ...data.data.products];
              }
            });
            // setMovies(data.Search || data);
    
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        fetchData()
      }, [params.id, page, category] );

      const loadMore = () => {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      };

    return(
        <section className="customcontainer mx-auto px-6 mb-16">
                <div className="grid grid-cols-2 gap-6 lg:gap-10 justify-items-center md:grid-cols-3 lg:grid-cols-4">
                {isLoading && (
                    <div className="text-center col-span-4">
                    <div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin"></div>
                    </div>
                )}
                {pria.map((e,index) => (
                    <ProductCard
                    id={e.id}
                    key={index}
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

                {pria.length === totalProduct ? " ": 
                  (
                  <div  className="w-full h-28 mt-20 flex flex-col justify-between items-center ">
                    {isLoading && <h2 className="">Loading...</h2>}
                    <button className="w-auto p-3 rounded-lg text-stone-50 bg-gogreen" onClick={loadMore}>Lihat Lainnya</button>
                </div>
                )}

            </section> 
    )
}