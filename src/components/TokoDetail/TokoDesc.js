import React from "react";


export default function TokoDesc({totalProduct , totalFavorite, totalReview, averageReview,clas}){
    
    return(
        <div className={clas}>
        <ul className="lg:w-full flex flex-wrap justify-start  items-center py-5 px-2 md:p-3 ">
            <li className="mr-0 sm:mr-5"  >
                <div className="flex">
                    <img 
                        className="mr-2"
                        src='/images/shopping-bag.png'
                        alt="shopping bag here"
                    />
                    <p className="text-sm lg:font-semibold sm:font-medium">Total Product</p>
                </div>
                <p className=" mx-16 font-extralight text-sm">{totalProduct}</p>                        
            </li>
            <li className=" mr-5">
                <div className="flex">
                    <img 
                        className="mr-2"
                        src='/images/icon-like.png'
                        alt="shopping like here"
                    />
                    <p className="text-sm lg:font-semibold sm:font-medium">Total Favorite</p>
                </div>
                <p className=" mx-16 font-extralight text-sm">{totalFavorite}</p>
                
            </li>
            <li className="md:mr-5">
                <div className="flex">
                    <img 
                        className="mr-2"
                        src='/images/rate-review.png'
                        alt="shopping review here"
                    />
                    <p className="text-sm lg:font-semibold sm:font-medium">Total Review</p>
                </div>
                <p className=" mx-16  font-extralight text-sm">{totalReview}</p>
                
            </li>
            <li className="md:mr-5">
                <div className="flex">
                    <img 
                        className="mr-2"
                        src='/images/star.png'
                        alt="shopping review here"
                    />
                    <p className="text-sm lg:font-semibold sm:font-medium">Rata-Rata Review</p>
                </div>
                <p className=" mx-16 font-extralight text-sm">{averageReview}</p>
                
            </li>
            
        </ul>
    </div>
    )
}