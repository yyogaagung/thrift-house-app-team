import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DaftarAlamat from './DaftarAlamat';
import FormUpdateUser from './FormUpdateUser';
import UbahPassword from './UbahPassword';
import {useSelector } from "react-redux";

function AkunSaya() {
    const [tabs, setTabs] = useState("Biodata Diri");
    const [profile, setProfile] = useState([])
    const {id} = useSelector((state) => state.login);

    const tabsHandler = (e) => {
        // console.log(e.target.textContent);
        setTabs(e.target.textContent);
      };

      useEffect(()=>{
        axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}`)
        .then(respon =>{
            // console.log(respon.data.data)
            setProfile(respon.data.data)
        })
        .catch(err => {
            console.log(err, "ll")
        })
      }
      
      
      ,[id])

  return (
    <>
    <div className='sm:w-full mx-auto my-7 px-6 sm:px-0'>
    <div className="px-0">
                <div className="thisistabs flex mb-10 justify-around items-center ">
                    <div
                    className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer ${
                        tabs === "Biodata Diri"
                        ? "text-gogreen border-b-[1px] border-b-gogreen"
                        : "text-[#AEAEBC]"
                    } `}
                    onClick={tabsHandler}
                    >
                    Biodata Diri
                    </div>
                    <div
                    className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer ${
                        tabs === "Daftar Alamat"
                        ? "text-gogreen border-b-[1px] border-b-gogreen"
                        : "text-[#AEAEBC]"
                    }`}
                    onClick={tabsHandler}
                    >
                    Daftar Alamat
                    </div>

                    <div
                    className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer ${
                        tabs === "Ubah Password"
                        ? "text-gogreen border-b-[1px] border-b-gogreen"
                        : "text-[#AEAEBC]"
                    }`}
                    onClick={tabsHandler}
                    >
                    Ubah Password
                    </div>
                </div>
            </div>

        {tabs === "Biodata Diri" ? <FormUpdateUser username={profile.username} fullname={profile.fullname} email = {profile.email} gender = {profile.gender} phone = {profile.phone} birthday ={profile.birth} ava={profile.profileImg} role={profile.role}/> : ""}
        {tabs === "Daftar Alamat" ? <DaftarAlamat/> : ""}
        {tabs === "Ubah Password" ? <UbahPassword email = {profile.email}/> : ""}
    </div>
 
    </>
  )
}

export default AkunSaya