import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CardAlamat from './CardAlamat';
import EmptyAlamat from './EmptyAlamat'
import FormAlamat from './FormAlamat';

export default function DaftarAlamat() {
  const [alamat, setAlamat] = useState([]);
  const { id } = useSelector((state) => state.login);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [addAlamat, setAddAlamat] = useState(false)

  useEffect(()=>{
    setIsLoading(true)
    axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/addresses`)
    .then(res=>{
      setAlamat(res.data.data)
      setIsLoading(false)
    }).catch(err =>{
      console.log(err)
      setIsLoading(false)
    })
  },[id])

  return (
   <>
    {isLoading === true ? <div className="p-7 w-full flex justify-center items-center mb-10"><div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin"></div></div> :
            ( 
              <div className='customcontainer mx-auto my-7 px-6 sm:px-0 flex flex-col justify-around'>
                <div className='flex justify-end md:px-7 lg:px-20 items-center'>
                  {addAlamat ? (
                    ""
                  ):
                  (
                    <button onClick={() => setAddAlamat(true)} className='bg-gogreen w-44  py-2 rounded-md flex justify-center mt-5 text-white text-sm'>Tambah Alamat Baru</button>
                  )}
                  
                </div>
                {addAlamat ? <FormAlamat/> : (
                  alamat.length === 0 ? 
                    <EmptyAlamat/>
                  :
                  (
                    alamat.map((el, index)=>(
                      <CardAlamat
                      penerima ={el.recipientName}
                      noPenerima ={el.recipientPhone}
                      fullAdress = {el.fullAddress} 
                      propinsi = {el.province} 
                      city ={el.city}
                      district ={el.district}
                      village = {el.village}
                      postalCode = {el.postalCode}
                      addressLabel = {el.addressLabel}
                      />
                    ))
                  )
                ) }
                  
        
               </div>
            )
        }
    
   </>
  )
}
