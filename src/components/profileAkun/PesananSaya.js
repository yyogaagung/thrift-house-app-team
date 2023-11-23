import React, { useState } from 'react'
import BelumBayar from './BelumBayar';
import Dibatalkan from './Dibatalkan';
import Dikemas from './Dikemas';
import Dikirim from './Dikirim';
import Selesai from './Selesai';
import {useSelector, useDispatch } from "react-redux";
import ModalDetailTransaksi from './ModalDetailTransaksi';
import ModalDetailUlasan from './ModalDetailUlasan';

export default function PesananSaya() {
    const {display} = useSelector((state) => state.subTab);
    const { isDisplay} = useSelector((state) => state.isModalTransaksi);
    const { isDisplayModal} = useSelector((state) => state.isModalUlasan);
    const dispatch =useDispatch()
    const [tabs, setTabs] = useState(display);
    console.log(tabs)

    const tabsHandler = (e) => {
        // console.log(e.target.textContent);
        setTabs(e.target.textContent);
      };
  return (
    <>
    <div className='overflow-auto px-1 w-full border-2 mb-10 my-10' >
    <div className='w-full mx-auto my-7 sm:px-0 overflow-auto scrollbar-hide'>
                <div className="w-tabpesanansaya sm:w-full flex mb-0 justify-around items-center  ">
                    <div
                    className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer  ${
                        tabs === "Belum Bayar"
                        ? "text-gogreen border-b-[1px] border-b-gogreen"
                        : "text-[#AEAEBC]"
                    } `}
                    onClick={tabsHandler}
                    >
                    Belum Bayar
                    </div>
                    <div
                    className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer ${
                        tabs === "Dikemas"
                        ? "text-gogreen border-b-[1px] border-b-gogreen"
                        : "text-[#AEAEBC]"
                    }`}
                    onClick={tabsHandler}
                    >
                    Dikemas
                    </div>

                    <div
                    className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer ${
                        tabs === "Dikirim"
                        ? "text-gogreen border-b-[1px] border-b-gogreen"
                        : "text-[#AEAEBC]"
                    }`}
                    onClick={tabsHandler}
                    >
                    Dikirim
                    </div>

                    <div
                    className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer ${
                        tabs === "Selesai"
                        ? "text-gogreen border-b-[1px] border-b-gogreen"
                        : "text-[#AEAEBC]"
                    }`}
                    onClick={tabsHandler}
                    >
                    Selesai
                    </div>

                    <div
                    className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer  ${
                        tabs === "Dibatalkan"
                        ? "text-gogreen border-b-[1px] border-b-gogreen"
                        : "text-[#AEAEBC]"
                    }`}
                    onClick={tabsHandler}
                    >
                    Dibatalkan
                    </div>
                </div>
                
            </div>
            

                {tabs === "Belum Bayar" ? <BelumBayar/>:""}
                {tabs === "Dikemas" ? <Dikemas/>:""}
                {tabs === "Dikirim" ? <Dikirim/>:""}
                {tabs === "Selesai" ? <Selesai/>:""}
                {tabs === "Dibatalkan" ? <Dibatalkan/>:""}
                {isDisplay && <ModalDetailTransaksi />}
                {isDisplayModal && <ModalDetailUlasan />}
 
    </div>
    </>
  )
}
