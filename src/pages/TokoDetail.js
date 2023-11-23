import React, { Fragment, useEffect } from "react";
import BannerToko from "../components/TokoDetail/Banner";
import TabKategori from "../components/TokoDetail/TabKategori";
import TokoDescWrap from "../components/TokoDetail/TokoDescWrap";
import { useSelector } from "react-redux";
import ModalLogin from "../components/TokoDetail/modalLogin";

export default function TokoDetail(){
    const { display } = useSelector((state) => state.isModalLogin);
    function scrollWin() {
        window.scrollTo(0, 0);
      }
    useEffect(()=>{
        scrollWin()
    },[])
    return(
        <div >
            <BannerToko/>
            <TokoDescWrap/>
            <TabKategori/>
            {display && <ModalLogin/> }
        </div>
    )
} 