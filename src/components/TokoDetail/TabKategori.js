import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TentangToko from "./Tentang";
import Pria from "./Pria";
import Wanita from "./Wanita";
import Anak from "./Anak";
import SemuaProduct from "./SemuaProduct";
import Ulasan from "./Ulasan";

export default function TabKategori(){
    const [tabKategori, setTabKategori] = useState("semua");
    const [tentang, setTentang] = useState([]);
    const params = useParams();

    useEffect(()=>{
        axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/stores/${params.id}/about`)
        .then((respone) => {
            setTentang(respone.data.data.about)
        })
        .catch((error) => {
            console.log(error)
        })
    },[params.id])
    
    return(
        <Fragment>
            <ul className="customcontainer mx-auto flex sm:justify-evenly overflow-auto mb-10  h-16 " >
                <li className="text-sm px-3 ml-5 py-2 md:mr-2  flex justify-center items-center cursor-pointer" >
                    {tabKategori === 'semua' ? 
                    <a  onClick={()=>{setTabKategori('semua')}} href="#0" className="w-32 hover:text-gogreen focus:text-gogreen md:text-base text-gogreen  block relative underline1">Semua Product</a>
                    :
                    <a onClick={()=>{setTabKategori('semua')}} href="#0" className="w-32 hover:text-gogreen focus:text-gogreen md:text-base   block relative mauafter othermauafter  ">Semua Product</a>}
                </li>
                <li  className="text-sm px-3 py-2  md:mr-2  flex justify-center items-center cursor-pointer" >
                    {tabKategori === "pria" ?
                    <a  onClick={()=>{setTabKategori('pria')}} href="#0" className="w-24 hover:text-gogreen focus:text-gogreen md:text-base text-gogreen  block relative underline5">Pria</a> :
                    <a onClick={()=>{setTabKategori('pria')}} href="#0" className="w-24 hover:text-gogreen focus:text-gogreen md:text-base block relative mauafter underline4">Pria</a>  }
                    
                </li>
                <li  className="text-sm px-3 py-2  md:mr-2  flex justify-center items-center cursor-pointer" >
                    {tabKategori === "wanita" ? 
                    <a  onClick={()=>{setTabKategori('anak')}} href="#0" className="w-24 hover:text-gogreen focus:text-gogreen md:text-base text-gogreen  block relative underline6">Wanita</a> :
                    <a onClick={()=>{setTabKategori('wanita')}} href="#0" className="w-24 hover:text-gogreen focus:text-gogreen md:text-base block relative mauafter">Wanita</a>
                    }
                    
                </li>
                <li  className="text-sm px-3 py-2  md:mr-2 mr-5 flex justify-center items-center cursor-pointer" >
                    {tabKategori === "anak" ? 
                    <a  onClick={()=>{setTabKategori('anak')}} href="#0" className="w-24 hover:text-gogreen focus:text-gogreen md:text-base text-gogreen  block relative underline7">Anak-anak</a> :
                    <a onClick={()=>{setTabKategori('anak')}} href="#0" className="w-24 hover:text-gogreen focus:text-gogreen md:text-base block relative mauafter underline2">Anak-anak</a>
                    }
                    
                </li>
                <li  className="text-sm px-3 py-2  md:mr-2  flex justify-center items-center cursor-pointer" >
                {tabKategori === "ulasan" ? 
                <a  onClick={()=>{setTabKategori('ulasan')}} href="#0" className="w-24 hover:text-gogreen focus:text-gogreen md:text-base text-gogreen  block relative underline6">Ulasan</a> :
                <a onClick={()=>{setTabKategori('ulasan')}} href="#0" className="w-24 hover:text-gogreen focus:text-gogreen md:text-base block relative mauafter">Ulasan</a>
                }
                    
                </li>
                <li  className="text-sm px-3 py-2  md:mr-2  flex justify-center items-center cursor-pointer" >
                    {tabKategori === "tentang" ? 
                    <a  onClick={()=>{setTabKategori('tentang')}} href="#0" className="w-32 hover:text-gogreen focus:text-gogreen md:text-base text-gogreen  block relative underline8">Tentang Toko</a> :
                    <a onClick={()=>{setTabKategori('tentang')}} href="#0" className="w-32 md:w-28 hover:text-gogreen focus:text-gogreen md:text-base block relative mauafter underline3">Tentang Toko</a>
                    }
                    
                </li>
            </ul>

            {tabKategori === 'semua' ? <SemuaProduct/>: ""}
            {tabKategori === 'pria' ? <Pria/>: ""}
            {tabKategori === 'wanita' ? <Wanita/>: ""}
            {tabKategori === 'anak' ? <Anak/> : ""}
            {tabKategori === 'ulasan' ? <Ulasan/> : ""}
            {tabKategori === 'tentang' ?<TentangToko tentang={tentang}/>: ""}
        </Fragment>

            
                
    )

}