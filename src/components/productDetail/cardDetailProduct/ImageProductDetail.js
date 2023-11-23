import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ImageDetail(){
    const params =useParams()
    const[oneProduct, setOneProduct] = useState([])
    const [tempBigImage, setTempBigImage] = useState('');
    const [loading, setLoading] = useState(false);
    
    

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://thrifthouse.herokuapp.com/api/v1/products/${params.id}`)
        .then((respone) => {
            setLoading(false)
            setOneProduct(respone.data.data.product.photos)
            setTempBigImage(respone.data.data.product.photos[0])
        })
        .catch((error) => {
            setLoading(false)
            console.log(error)
        })
      },[params.id])
    
    return(
        <Fragment>
         {loading === true ?  <div className="w-full lg:p-52 lg:w-1/2 mb-28 flex justify-center items-center">
         <div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin "></div>
         </div>: (
            <div className="lg:w-2/5 md:container md:w-2/4 h-auto p-10 mr-5">    
            <div className="w-full h-auto ">
                <img 
                    className="w-full h-full"
                    src={tempBigImage}
                    alt="detail product"
                />
            </div>
            <div className="mt-10 " >
                <ul className="flex justify-between">
                    {oneProduct.map((el,id) => (
                        <li key={id} className="w-20 h-auto shadow-md p-3 border-2 hover:border-green-500">
                        <img 
                            className="cursor-pointer"
                            onClick={() => setTempBigImage(el)}
                            src={el}
                            alt="full"
                        />
                    </li>
                    ))}
                    
                    
                </ul>
            </div>
    </div>
         )} 

        
        </Fragment>
    )
}