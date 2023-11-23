import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from "react-redux";
import { displayModalTransaksi } from '../../action';
import CardPesananDetail from './CardPesananDetail';

export default function ModalDetailTransaksi() {
  const dispatch = useDispatch();
  const [orderDetail, setOrderDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const [store, setstore] = useState([])
  const [total, settotal] = useState(false)
  const {id} = useSelector((state) => state.login);
  const {idOrder} = useSelector((state) => state.isModalTransaksi);
  


  useEffect(()=>{
    setLoading(true)
    axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/orders/${idOrder}`)
    .then(res => {
      setOrderDetail(res.data.data)
      let total = res.data.data.productsPrice + res.data.data.shippingCost
      total.toLocaleString("id-ID")
      settotal(total)
  setstore(res.data.data.store)

      setLoading(false)
    })
    .catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[id, idOrder])

  let picis = 0
  store.forEach(element => {
    element.products.forEach(el => {
      picis = picis + 1
    })
    
  });

        return(
        <div className="w-full h-full bg-black-rgba fixed z-50 left-0 right-0  top-0 bottom-0">
            <div className="w-80 h-[700px] md:w-[786px]  rounded-lg p-4 mx-auto shadow-lg bg-[#E5E5E5] mt-5 overflow-auto scrollbar-hide">
              <div className='w-full flex  py-0 mb-10 '>
              <p className='w-full text-center font-bold text-lg text-gogreen'>Detail Transaksi</p>
              <button className="w-auto flex justify-end" onClick={()=>dispatch(displayModalTransaksi(false))}>X</button>
              </div>
                <div className='bg-white p-4'>
                    <div className='flex justify-between'>
                        <p className="font-bold text-xs md:text-sm mb-2 text-[#5D5E79]">ID Pembayaran</p>
                        <p className="font-bold text-xs md:text-sm mb-2 text-[#5D5E79]">{orderDetail.orderCode}</p>
                      </div>
                      
          <CardPesananDetail/>
    
                </div>

                

                <div className='bg-white p-4 mt-5'>
                  <p className="font-bold text-xs md:text-sm  mb-2 text-black">Total Harga</p>
                  <div className='w-full flex justify-between'>
                  <p className='text-xs md:text-sm font-normal text-gray-500 mt-2'>Jumlah barang</p>
                  <p className='text-xs md:text-sm font-normal text-gray-500 mt-2'>{picis}pcs</p>

                  </div>
                  <div className='w-full flex justify-between'>
                  <p className='text-xs md:text-sm font-normal text-gray-500 mt-2'>Total harga barang</p>
                  <p className='text-xs md:text-sm font-normal text-gray-500 mt-2'>Rp{orderDetail.productsPrice}</p>
                  </div>
                  <div className='w-full flex justify-between'>
                  <p className='text-xs md:text-sm font-normal text-gray-500 mt-2'>Biaya Pengiriman</p>
                  <p className='text-xs md:text-sm font-normal text-gray-500 mt-2'>Rp{orderDetail.shippingCost}</p>

                  </div>
                  <div className='w-full flex justify-between'>
                  <p className='text-sm md:text-lg font-bold text-black mt-2'>Total Belanja</p>
                  <p className='text-sm md:text-lg font-bold text-black mt-2'>Rp{total.toLocaleString("id-ID")}</p>

                  </div>
                </div>
                
                
                
            </div>
        </div>
    )
}
