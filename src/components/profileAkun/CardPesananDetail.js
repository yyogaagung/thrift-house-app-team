import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from "react-redux";
import { displayModalTransaksi } from '../../action';

export default function CardPesananDetail() {
  const dispatch = useDispatch();
  const [store, setstore] = useState([])
  const [alamat, setalamat] = useState([])
  const [orderDetail, setOrderDetail] = useState([])
  const [loading, setLoading] = useState(false)
  const {id} = useSelector((state) => state.login);
  const {idOrder} = useSelector((state) => state.isModalTransaksi);
  const i =0
  


  useEffect(()=>{
    setLoading(true)
    axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/orders/${idOrder}`)
    .then(res => {
      setOrderDetail(res.data.data)
      setstore(res.data.data.store)
      setalamat(res.data.data.address)
      setLoading(false)
    })
    .catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[id, idOrder])
  

  
  return (
    <>

        <div className="w-full">
        <div className='flex justify-between items-center'>
        <div className='w-full flex flex-col justify-between items-start '>
            {store.map(el => 
              (
              <div className=' w-full '>
                <div className='flex justify-between'>
                    <p className="font-bold text-xs md:text-sm mb-2 text-black">Detail Produk</p>
                    <p className="font-bold text-[10px] md:text-xs mb-2 text-black">{el.name} <span className='ml-1 text-sm'>{">"}</span></p>
                </div>

                {el.products.map(el1 => (
                  <div className='w-full flex flex-wrap justify-between items-center p-2 mt-5 '>
                <div className='flex items-center '>
                <div className="flex justify-center items-center rounded-full w-10 h-10  mr-2 ">
                        <img 
                        className="w-full "
                        src={el1.photo}
                        alt="produk"
                        />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <p className='font-bold text-xs lg:text-base'>{el1.brand}</p>
                        <p className='text-xs lg:text-sm '>{el1.name}</p>
                    </div>
                </div>
               
                <div className='flex flex-col'>
                    <p className='text-xs bg-[#F2F2F2] text-[#6A6A6A] flex justify-center w-auto mb-3'>{el1.size}</p>
                    <p className='text-xs bg-[#F2F2F2] text-[#6A6A6A] flex justify-center w-auto'>{el1.condition}</p>
                </div>
                <div className=' mt-5 lg:mt-0 w-1/2 lg:w-auto '>
                <p className='text-xs lg:text-base'>{1} item <span>({el1.weight} gram)</span></p>
                <p className='text-xs font-semibold lg:text-base'>Rp{el1.price.toLocaleString("id-ID")}</p>
                </div>
            </div>

                ))}

                <div className='bg-white p-4 mt-5'>
                    <p className="font-bold text-xs md:text-sm  mb-2 text-black">Info Pengiriman</p>
                    <div>
                        <p className='text-xs md:text-sm  flex flex-wrap mr-5'>{el.deliveryService}<span className='md:ml-3 bg-gogreen text-white text-xs  font-light p-1 rounded-lg'>{el.shippingService}</span></p>
                    </div>
                    <p className='text-xs md:text-sm font-normal text-gray-500 mt-2'>Akan diterima pada tanggal {el.estimatedTimeOfDeparture}</p>
                    <p className='text-[10px] md:text-xs font-normal text-gray-500 mt-2'>Pastikan metode pengiriman sudah sesuai kebutuhanmu</p>

                    
                </div>
                
              </div>
              
            )            
            )}
            <div className='bg-white p-4 '>
            <p className="font-bold text-xs md:text-sm  mb-2 text-black mt-5">Alamat Pengiriman</p>
                    <p className='text-xs md:text-sm font-normal text-gray-500 mt-2'>{alamat.recipientName}</p>
                    <p className='text-xs md:text-sm font-normal text-gray-500 '>{alamat.fullAddress}, {alamat.village}, {alamat.city}, {alamat.province}</p>
            </div>
                    
            </div>
        </div>
            </div>
       
    </>
  )
}
