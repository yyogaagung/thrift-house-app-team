import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BannerToko = () => {
    const [bannerToko, setBannerToko] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const params = useParams();

    useEffect(()=>{
        axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/stores/${params.id}/banner`)
        .then((respone) => {
            setBannerToko(respone.data.data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })
    },[params.id])
    return (
        <Fragment>
            { isLoading === true ?  <div className="w-full  mb-28 flex justify-center items-center">
         <div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin "></div>
         </div>:(
            <div className="customcontainer lg:w-wbanner lg:h-hbanner mx-auto px-6 lg:px-0 my-10 relative">
            <img 
            className=" bg-center bg-no-repeat bg-cover w-full h-full "
            src={bannerToko.banner} 
            alt="banner1" />
        </div>
         )}
        </Fragment>
        
       
    );
};

export default BannerToko;
