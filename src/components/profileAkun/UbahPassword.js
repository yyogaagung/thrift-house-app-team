import axios from 'axios';
import React, { useState } from 'react'
import {useSelector } from "react-redux";

export default function UbahPassword({email}) {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirm, setConfirm] = useState('');
    const {id} = useSelector((state) => state.login);
    const [berhasil, setBerhasil] = useState (false);
    const [modal, setModal] = useState(false);
    const [gagal, setGagal] = useState (false);
    const [isloading, setIsloading] = useState(false)
    const [error, setError] = useState([])

   

    const updateOldPass = (e) => {
        setOldPass(e.target.value);
        
    }
    const updateNewPasword = (e) => {
        setNewPass(e.target.value);  
            
    }
    const updateConfirmPasword = (e) => {
        setConfirm(e.target.value); 
             
    }

    const submitUpdate = (e) => {
        e.preventDefault(); 
        setIsloading(true)
        axios.put(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/profile/password`,
        
            {
                "confirmPassword": confirm,
                "newPassword": newPass,
                "oldPassword": oldPass

            }
        )
        .then((response) => {
            setModal(false);
            setBerhasil(true)
            setIsloading(false)
        })
        .catch((error) => {
            console.log(error)
            setError(error)
            setModal(false)
            setGagal(true)
            setIsloading(false)
            // dispatch(LoginActionFailed(error))
        })
    }
    
    function handleModal(e) {
        e.preventDefault(); 
        setModal(true)
    }

    function sureModal(e) {
        return (
            <>
                 {isloading ? (
                    <div className="w-full bg-black-rgba fixed z-50 top-0 bottom-0 left-0 right-0 p-6 flex justify-center items-center mx-auto "><div className='bg-white p-10'><div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin"></div></div></div>
                )
                :
                (
                    <div className="bg-black-rgba fixed flex z-50 top-0 bottom-0 left-0 right-0 p-6">
                <div className="bg-white rounded-lg m-auto  overflow-hidden">
                <div className=" px-14 pt-7 pb-6">
                    <p className="font-bold text-sm mb-2">Apakah kamu yakin?</p>
                    <p className="text-xs">
                    Jika tekan <span className='text-gogreen font-semibold'>ganti</span> maka password kamu berubah.
                    </p>
                </div>
                <div className="flex justify-end p-2">
                    <button
                    type="button"
                    onClick={(e) => setModal(!modal)}
                    className="py-2 px-7 text-xs   hover:bg-gray-100 hover:text-gray-600 text-white rounded-md bg-gogreen font-semibold mr-5"
                    >
                    Batalkan
                    </button>
                    <button
                    onClick={submitUpdate}
                    className="py-2 px-7 text-xs font-medium border-2 border-gogreen rounded-md text-gogreen hover:bg-gray-50 "
                    >
                    Ganti
                    </button>
                </div>
                </div>
            </div>
                )}
            </>
            
        );
      }

      function Berhasil(e) {
        return (
            <div className="bg-black-rgba fixed flex z-50 top-0 bottom-0 left-0 right-0 p-6">
                <div className="bg-white rounded-lg m-auto  overflow-hidden">
                <div className=" px-14 pt-7 pb-6">
                    <p className="font-bold text-sm mb-2">Password berhasil diubah</p>
                    <p className="text-xs">
                    Ingat selalu password kamu
                    </p>
                </div>
                <div className="flex">
                    <button
                    type="button"
                    onClick={(e) => setBerhasil(!berhasil)}
                    className="flex-grow py-4 text-xsborder-[0.3px] hover:bg-gray-100 text-gogreen font-semibold"
                    >
                    Ok
                    </button>
                </div>
                </div>
            </div>
        );
      }

      function Gagal(e) {
        return (
            <div className="bg-black-rgba fixed flex z-50 top-0 bottom-0 left-0 right-0 p-6">
                <div className="bg-white rounded-lg m-auto  overflow-hidden">
                <div className=" px-14 pt-7 pb-6">
                    <p className="font-bold text-sm mb-2">{error.code} {error.response.status}</p>
                    <p className="text-xs">
                    Periksa kembali password yang kamu masukan
                    </p>
                </div>
                <div className="flex">
                    <button
                    type="button"
                    onClick={(e) => setGagal(!gagal)}
                    className="flex-grow py-4 text-xsborder-[0.3px] hover:bg-gray-100 text-gogreen font-semibold"
                    >
                    Ok
                    </button>
                </div>
                </div>
            </div>
        );
      }

  return (
   <>
    <div className='customcontainer mx-auto my-7 sm:px-0 flex flex-wrap justify-around px-6'>
    <div className=' w-full md:px-7 lg:px-20'>
            <p className='text-sm'>Buat kata sandi baru untuk akun dengan email <span  className='font-semibold text-sm'>{email}</span></p>
    </div>
    </div>
    <form className='customcontainer mx-auto my-7 px-6 sm:px-0 flex flex-col justify-around lg:px-20' onSubmit={handleModal}>
    <div className=''>
    <label className='flex flex-col py-3 px-2 text-sm lg:text-base'>
    Kata sandi lama
            <input type="password" name="Kata sandi lama" placeholder='Kata sandi lama' className='border-2 w-80  lg:w-96 p-2 rounded-md text-sm mt-2' onChange={updateOldPass}/>
    </label>
    <span className='flex justify-between w-80  lg:w-96'> <p className='text-xs -mt-3 p-2 text-gray-300'>Minimal 8 karakter</p> <p className='text-xs -mt-3 p-2 text-gogreen'>Lupa password?</p></span>
   
    <label className='flex flex-col py-3 px-2 text-sm lg:text-base'>
        Kata sandi baru
            <input type="password" name="Kata sandi baru" placeholder='Kata sandi baru' className='border-2 w-80  lg:w-96  p-2 rounded-md text-sm mt-2' onChange={updateNewPasword}/>
    </label>
    <p className='text-xs -mt-3 p-2 text-gray-300'>Minimal 8 karakter</p>
    <label className='flex flex-col py-3 px-2 text-sm lg:text-base'>
            Ketik ulang kata sandi baru
            <input type="password" name="Ketik ulang kata sandi baru" placeholder='Ketik ulang kata sandi baru' className='border-2 w-80  lg:w-96  p-2 rounded-md text-sm mt-2' onChange={updateConfirmPasword}/>
    </label>
    <p className='text-xs -mt-3 p-2 text-gray-300'>Minimal 8 karakter</p>
    </div>


      {(oldPass ==="" || newPass ==="" || confirm===""  ) ? (
        <div className='flex justify-center items-center mt-16'>
        <p className='bg-gray-100 w-40  py-2 rounded-md flex justify-center mt-5 text-gray-300 text-sm'>Ubah Kata Sandi</p>
        </div>
        
      ):(
        <div className='flex justify-center items-center mt-16'>
        <button className='bg-gogreen w-40  py-2 rounded-md flex justify-center mt-5 text-white text-sm'>Ubah Kata Sandi</button>
        </div>
      )}
        
    </form>
    {modal && sureModal()}
    {berhasil && Berhasil()}
    {gagal && Gagal()}
   </>
  )
  }
