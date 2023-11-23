import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import AkunSaya from './AkunSaya';
import PesananSaya from './PesananSaya';
import {useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import Logout from './Logout';
import Notification from './Notification'
import { useSearchParams } from 'react-router-dom';

import {
  logout,
  userDestroyNotif,
  setSubTabProfile,
  setTabProfile,
} from "../../action";

function Username() {
  const [tabs, setTabs] = useState("Akun Saya");
  const [profile, setProfile] = useState([])
  const {id} = useSelector((state) => state.login);
  const {display} = useSelector((state) => state.tabProfile);
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  // Config Notifikasi
  useEffect(() => {
      dispatch(setTabProfile(searchParams.get("action")));
  }, []);

  const tabsHandler = (e) => {
    // console.log(e.target.textContent);
    dispatch(setTabProfile(e.target.textContent))
    dispatch(setSubTabProfile("Belum Bayar"))
  };

   function handleLogout(){
      dispatch(logout())
      dispatch(userDestroyNotif());
   }

    function handleModal(e) {
        e.preventDefault(); 
        setTabs(e.target.textContent);
        setModal(true)
    }

    useEffect(()=>{
      axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}`)
      .then(respon =>{
          setProfile(respon.data.data)
      })
      .catch(err => {
          console.log(err, "ll")
      })
    }
    
    
    ,[id])


    function sureModal(e) {
      return (
          <>
              
                  <div className="bg-black-rgba fixed flex z-50 top-0 bottom-0 left-0 right-0 p-6">
              <div className="md:w-1/2 bg-white rounded-lg m-auto  overflow-hidden pb">
              <div className=" px-14 pt-7 pb-6 flex flex-col justify-center items-center">
                  <p className="font-bold text-lg mb-2 text-gogreen">Keluar Akun</p>
                  <div className='w-1/2 flex justify-center items-center'>
                    <img
                      className=''
                      src='/images/animasilogout.png'
                      alt='animasilogout'
                    />
                  </div>
                  <p className="text-sm font-normal mt-5">
                  Anda Yakin Mau Keluar?
                  </p>
              </div>
              <div className=" mb-10 flex justify-center ">
                  <button
                  type="button"
                  onClick={(e) => {
                    setModal(!modal);
                    dispatch(setTabProfile('Akun Saya'))
                  }}
                  className="py-2 px-7 text-xs  w-1/3  hover:bg-gray-100 hover:text-gray-600 text-white rounded-md bg-gogreen font-semibold mr-5"
                  >
                  Batalkan
                  </button>
                  <button
                  onClick={handleLogout}
                  className="py-2 px-7 text-xs w-1/3 font-medium border-2 border-gogreen rounded-md text-gogreen hover:bg-gray-50 "
                  >
                  Keluar
                  </button>
              </div>
              </div>
          </div>
             
          </>
          
      );
    }

  return (
    <>
    <div className='customcontainer flex justify-evenly flex-wrap sm:flex-nowrap mx-auto sm:px-4'>
    <div className='mr-3'>
    <div className="w-80 lg:w-80 sm:w-64 flex justify-start items-center mx-auto p-2  my-10 border-2 rounded-md">
          <div className='flex justify-start items-center rounded-full w-10 h-10  mr-5 overflow-hidden'>
              <img
                  className='w-full'
                  src={profile.profileImg}
                  alt='ava'
              />
          </div>
          <div className='flex flex-col justify-between'>
              <p className='text-base font-semibold'>{profile.username}</p>
              <p className='text-sm font-normal text-gray-400'>{profile.email}</p>
          </div>
      </div>

      <div className='w-80 lg:w-80 sm:w-64 flex justify-start items-center mx-auto p-2  my-10'>
        <ul className=' w-full flex flex-col'>
          <li className={`flex p-3 text-sm lg:text-base ${
            display === "Akun Saya" 
            ?  " border-b-2 border-l-8 border-gogreen text-gogreen" 
            :"border-b-2"
          }`} onClick={tabsHandler}>
          {display === "Akun Saya" ? 
          (
            <div className='flex items-center'>
              <img
                className='mr-4'
                src='/images/fokusakun.png'
                alt='akun'
              />
            </div>
          )
          :
          (
            <div className='flex items-center '>
              <img
                className='mr-4'
                src='/images/akun.png'
                alt='akun'
              />
            </div>
          )}
            Akun Saya
          </li>

          <li className={`flex p-3 text-sm lg:text-base ${
            display === "Pesanan Saya" 
            ?  " border-b-2 border-gogreen text-gogreen border-l-8" 
            :"border-b-2"
          }`} onClick={tabsHandler}>
          {display === "Pesanan Saya" ? 
          (
            <div className='flex items-center'>
              <img
                className='mr-4'
                src='/images/fokuspesanan.png'
                alt='pesanan'
              />
            </div>
          )
          :
          (
            <div className='flex items-center'>
              <img
                className='mr-4'
                src='/images/pesanan.png'
                alt='pesanan'
              />
            </div>
          )}
            Pesanan Saya
          </li>

          <li className={`flex p-3 text-sm lg:text-base ${
            display === "Notifikasi" 
            ?  " border-b-2 border-gogreen text-gogreen border-l-8" 
            :"border-b-2"
          }`} onClick={tabsHandler}>
          {display === "Notifikasi" ? 
          (
            <div className='flex items-center'>
              <img
                className='mr-4'
                src='/images/fokusnotif.png'
                alt='notif'
              />
            </div>
          )
          :
          (
            <div className='flex items-center'>
              <img
                className='mr-4'
                src='/images/notif.png'
                alt='notif'
              />
            </div>
          )}
            Notifikasi
          </li>

          <li className={`flex p-3 text-sm lg:text-base ${
            display === "Keluar Akun" 
            ?  " border-b-2 border-gogreen text-gogreen border-l-8" 
            :"border-b-2"
          }`} onClick={handleModal}>
          {display === "Keluar Akun" ? 
          (
            <div className='flex items-center'>
              <Icon
                className='mr-4'
                icon="ic:baseline-logout" 
                alt='logout'
                width="24" height="24"
              />
            </div>
          )
          :
          (
            <div className='flex items-center'>
              <Icon
                className='mr-4 text-[#626876]'
                icon="ic:baseline-logout" 
                alt='logout'
                width="24" height="24"
              />
            </div>
          )}
            Keluar Akun
          </li>
          
         
        </ul>
      </div>
    </div>


      {display === "Akun Saya" ? <AkunSaya/> : ""}
      {display === "Pesanan Saya" ? <PesananSaya/> : ""}
      {display === "Notifikasi" ? <Notification/> : ""}
      {display === "Keluar Akun"  ? <Logout/> : ""}
    </div>
     {modal && sureModal()}
    </>

  )
}

export default Username