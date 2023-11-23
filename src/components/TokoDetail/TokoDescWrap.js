import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useParams } from "react-router-dom";
import { isModalLoginFunc } from "../../action";
import TokoDesc from "./TokoDesc";
import { useDispatch} from "react-redux";


export default function TokoDescWrap(){
    const params =useParams()
    const[oneStore, setOneStore] = useState([])
    const { id } = useSelector((state) => state.login);
    const [hasFavToko, setHasFavToko] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoading1, setIsLoading1] = useState(true);
    const { access_token: accessToken } = useSelector((state) => state.login);
    const dispatch = useDispatch()

    function showHiddenModal(e){
        e.preventDefault();
        dispatch(isModalLoginFunc   (true))
    }

    useEffect(()=>{
        axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/stores/${params.id}/informations`)
        .then((respone) => {
            setOneStore(respone.data.data)
            setIsLoading(false)
        })
        .catch((error) => {
            console.log(error)
        })

        axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/stores/favorites`)
        .then((respone) => {
            for(let i=0; i < respone.data.data.length; i++){
                if(respone.data.data[i].id === params.id ){
                    setHasFavToko(true)
                }
            }
            setIsLoading1(false)
        })
        .catch((error) => {
            console.log(error)
        })
    },[params.id, id])

    function handleHapusFav() {
        
            axios({
                method: 'post',
                url: `https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/stores/favorites`,
                headers: {}, 
                data: {
                    "storeId": params.id, // This is the body part
                }
              }).then((respone)=>{
                setHasFavToko(false)
                console.log(respone)
              }).catch(error => console.log(error));
       
    }

    function handleTambahFav() {
        axios({
            method: 'post',
            url: `https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/stores/favorites`,
            headers: {}, 
            data: {
                "storeId": params.id, // This is the body part
            }
          }).then((respone)=>{
            setHasFavToko(true)
            console.log(respone)
          }).catch(error => console.log(error));
   
}


    return(
        <Fragment>
        {isLoading === true ? <div className="p-7 w-full flex justify-center items-center mb-10"><div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin"></div></div> :
            (
                <div className="customcontainer mx-auto shadow-sm shadow-black-rgba  rounded-md mb-10 p-2 box-border">
                <div className="wrap--desctoko place-content-center lg:pl-14 ">
                            <div className="grid-bio flex justify-center items-center p-3">
                                <div className="flex justify-center items-center rounded-full w-14 h-14  mr-5">
                                    <img 
                                        className="w-full "
                                        src={oneStore.photo}
                                        alt="logo toko"
                                    />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold">{oneStore.name}</p>
                                    <p className="text-sm lg:text-base lg:font-light font-extralight">{oneStore.city}, {oneStore.province} </p>
                                </div>
                            </div>

                            <TokoDesc 
                                clas = {'grid-desc'}
                                totalProduct = {oneStore.totalProduct}
                                totalFavorite = {oneStore.favoriteStore}
                                totalReview = {oneStore.totalReview}
                                averageReview = {oneStore.averageReview}
                            />
                            <div className="grid-btn flex flex-col justify-evenly items-center">
                                {accessToken === "" ? 
                                    (<p to={'/toko'} onClick={showHiddenModal} className="rounded w-auto h-auto bg-gogreen text-xs lg:text-sm text-white py-2 px-3 hover:bg-gogreen cursor-pointer" >Jadikan Favorite</p>)
                                    :
                                    (
                                    hasFavToko ? 
                                    <p to={'/toko'} onClick={handleHapusFav} className="rounded w-auto h-auto border-2 text-xs lg:text-sm cursor-pointer border-gogreen text-gogreen py-2 px-3 hover:bg-gogreen hover:text-white " >Hapus Favorite</p>
                                    : <p to={'/toko'} onClick={handleTambahFav} className="rounded w-auto h-auto bg-gogreen text-xs lg:text-sm text-white py-2 px-3 hover:bg-gogreen cursor-pointer" >Jadikan Favorite</p>
                                
                                    )
                                }
                                
                            </div>
                </div>
            </div>
            )
        }
            
        </Fragment>
       
        
    )
}