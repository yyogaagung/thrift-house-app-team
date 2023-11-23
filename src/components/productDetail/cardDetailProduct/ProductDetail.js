import React from "react";
import DescProduct from "./ProductDesc";
import ImageDetail from "./ImageProductDetail";

export default function CardProductDetail(){
    

    return(
        
            
            <div className="max-w-7xl md:max-w-2xl md:flex md:flex-row lg:max-w-7xl flex-1 lg:flex  lg:flex-row sm:flex sm:flex-col   mx-auto ">
                <ImageDetail />
                <DescProduct  />
            </div>
        
    )
}