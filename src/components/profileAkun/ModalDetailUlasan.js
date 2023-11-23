import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from "react-redux";
import {  displayModalUlasan } from '../../action';
import FormUlasan from './FormUlasan';

export default function ModalDetailUlasan() {
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const {id} = useSelector((state) => state.login);
  const {idOrder} = useSelector((state) => state.isModalTransaksi);
  


  useEffect(()=>{
    setLoading(true)
    axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/orders/${idOrder}`)
    .then(res => {
      setOrderDetail(res.data.data)

      setLoading(false)
    })
    .catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[id, idOrder])

  return (
    <>
        return(
        <div className="w-full h-full bg-black-rgba fixed z-50 left-0 right-0  top-0 bottom-0">
            <div className="w-80 h-[700px] md:w-[786px]  rounded-lg p-4 mx-auto shadow-lg bg-[#E5E5E5] mt-5 overflow-auto scrollbar-hide">
              <div className='w-full flex  py-0 mb-10 '>
              <p className='w-full text-center font-bold text-lg text-gogreen'>Ulasan</p>
              <button className="w-auto flex justify-end" onClick={()=>dispatch(displayModalUlasan(false))}>X</button>
              </div>
                <div className='bg-white p-4'>
                    <div className='flex justify-between'>
                        <p className="font-bold text-xs md:text-sm mb-2 text-[#5D5E79]">ID Pembayaran</p>
                        <p className="font-bold text-xs md:text-sm mb-2 text-[#5D5E79]">{orderDetail.orderCode}</p>
                      </div>
                </div>
                
                <div className='bg-white p-4'>                      
                        <FormUlasan/>
                </div>

               
                
                
                
            </div>
        </div>
    )
    </>
  )
}
