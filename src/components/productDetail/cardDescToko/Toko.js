import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TokoDesc from "./TokoDesc";


export default function Toko(){
    const params =useParams()
    const[oneStore, setOneStore] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        axios.get(`https://thrifthouse.herokuapp.com/api/v1/products/${params.id}`)
        .then((respone) => {
            setOneStore(respone.data.data.store)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
    },[params.id])


    
    return(
        <Fragment>
        {isLoading === true ? <div className="p-7 w-full flex justify-center items-center mb-10"><div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin"></div></div> :
        (
            <div className="customcontainer mx-auto shadow-sm shadow-black-rgba  rounded-md mb-10 p-2 box-border">
            <div className="wrap--desctoko place-content-center lg:pl-14">
                <div className="grid-bio flex p-5">
                <div className="flex justify-center items-center rounded-full w-10 h-10  mr-2">
                    <img 
                        className="w-full "
                        src={oneStore.photo}
                        alt="logo toko"
                    />
                </div>
                <div>
                    <p className="text-sm font-semibold">{oneStore.name}</p>
                    <p className="text-sm font-extralight">{oneStore.city}, {oneStore.province} </p>
                </div>
                </div>
                
            
                
            <TokoDesc 
                clas = {'grid-desc'}
                totalProduct = {oneStore.totalProduct}
                totalFavorite = {oneStore.favoriteStore}
                totalReview = {oneStore.totalReview}
                averageReview = {oneStore.averageReview}
            />
            
            
                 <div className="grid-btn flex  justify-evenly items-center">
                <Link to={`/toko/${oneStore.id}`} className="rounded w-auto h-auto bg-gogreen text-xs lg:text-sm text-white py-2 px-3 hover:bg-gogreen cursor-pointer" >Kunjungi Toko</Link>
                </div>
                
           
            
            </div>

            
        </div>
        )
        }
        </Fragment>
    )
       
       
}