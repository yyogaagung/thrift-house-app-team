import React from 'react'
import { useDispatch} from "react-redux";
import { displayModalTransaksi, displayModalUlasan } from '../../action';
import { Link } from "react-router-dom";

export default function CardPesanan({
  store,
               id,
              orderCode ,
              status ,
              kotaToko ,
              idKotaToko ,
              idToko ,
              name ,
              phototoko ,
              provinsi ,
              provinsiId ,
              kondisi ,
              namaproduk ,
              photoproduk ,
              harga,
              size ,
              berat,
              brand,
              jumlah
}) {
  const dispatch = useDispatch();
  return (
    <>
    <div className='md:px-0 lg:px-10 '>
        <div className=" shadow-lg p-4 rounded-lg mb-4 mt-10 ">
        <div className='flex justify-between items-center'>
        <div className='w-full flex flex-col justify-between items-start '>
              
              <div className='w-full mb-5 p-2'>
              <div className='flex '>
              <div className='w-full flex'>
              <div className="flex justify-center items-center rounded-full w-14 h-14  mr-3">
                        <img 
                        className="w-full "
                        src={store[0].photo}
                        alt="logo toko"
                        />
                    </div>
                    <div>
                    <p className="text-sm font-bold lg:text-base">{store[0].name}</p>
                    <p className="text-sm   font-extralight">{store[0].city}, {store[0].province} </p>
                    </div>
              </div>
                   
                    <div className='w-1/4  flex justify-end'>
                    {status === "Selesai" && (
                    <p className='text-xs w-32 h-9 sm:h-13 flex justify-center items-center lg:h-7 lg:w-40 mb-5 bg-[#49BC19] py-1 px-1 rounded-md text-center text-white'>{status}</p>
                    )}
                    {status === "Menunggu pembayaran" && (
                    <p className='text-xs w-32 h-9 sm:h-13 flex justify-center items-center lg:h-7 lg:w-40 mb-5 bg-[#FBCA03] py-1 px-1 rounded-md text-center text-black'>{status}</p>
                    )}
                    {status === "Menunggu dikemas" && (
                    <p className='text-xs w-32 h-9 sm:h-13 flex justify-center items-center lg:h-7 lg:w-40 mb-5 bg-[#FFF8CC] py-1 px-1 rounded-md text-center text-[#D8A901]'>{status}</p>
                    )}
                    {status === "Pesanan diproses" && (
                    <p className='text-xs w-32 h-9 sm:h-13 flex justify-center items-center lg:h-7 lg:w-40 mb-5 bg-[#CECFD7] py-1 px-1 rounded-md text-center text-[#343557]'>{status}</p>
                    )}
                    {status === "Pesanan dibatalkan" && (
                    <p className='text-xs w-32 h-9 sm:h-13 flex justify-center items-center lg:h-7 lg:w-40 mb-5 bg-[#B4B4B4] py-1 px-1 rounded-md text-center text-white'>{status}</p>
                    )}
                    {status === "Pesanan ditolak" && (
                    <p className='text-xs w-32 h-9 sm:h-13 flex justify-center items-center lg:h-7 lg:w-40 mb-5 bg-[#D8421D] py-1 px-1 rounded-md text-center text-white'>{status}</p>
                    )}
                    </div>
                    
                </div>

               
                  <div className='w-full flex flex-wrap justify-between items-center p-2 mt-5 '>
                <div className='flex items-center '>
                <div className="flex justify-center items-center rounded-full w-10 h-10  mr-2 ">
                        <img 
                        className="w-full "
                        src={store[0].products[0].photo}
                        alt="produk"
                        />
                    </div>
                    <div className='flex flex-col justify-center'>
                        <p className='font-bold text-xs lg:text-base'>{store[0].products[0].brand}</p>
                        <p className='text-xs lg:text-sm '>{store[0].products[0].name}</p>
                    </div>
                </div>
               
                <div className='flex flex-col'>
                    <p className='text-xs bg-[#F2F2F2] text-[#6A6A6A] flex justify-center w-auto mb-3'>{store[0].products[0].size}</p>
                    <p className='text-xs bg-[#F2F2F2] text-[#6A6A6A] flex justify-center w-auto'>{store[0].products[0].condition}</p>
                </div>
                <div className=' mt-5 lg:mt-0 w-1/2 lg:w-auto '>
                <p className='text-xs lg:text-base'>{1} item <span>({store[0].products[0].weight} gram)</span></p>
                <p className='text-xs font-semibold lg:text-base'>Rp{store[0].products[0].price.toLocaleString("id-ID")}</p>
                </div>
            </div>

              
                
              </div>    
            
            </div>
        </div>
           
            

           
            
            <div className=" flex flex-wrap justify-end mt-2">
              <button
              onClick={e => dispatch(displayModalTransaksi({modal:true, id:id}))}
                className="rounded  border-2  w-[183px] lg:w-auto text-xs  border-gogreen text-gogreen py-3 px-6 mr-5 flex items-center justify-center  hover:bg-gogreen hover:text-white mb-2 lg:mb-0 "
              >
                Detail Transaksi
              </button>
              {status === "Menunggu pembayaran" ? (
                <Link to={`/keranjang/payment/${id}`}
                className="rounded text-xs  bg-gogreen text-white py-3 px-6 mr-5 flex items-center justify-center hover:bg-green-600"
              >
                Lanjut ke pembayaran
              </Link>
              ):""}

              {status === "Selesai" ? (
                <button
                onClick={e => dispatch(displayModalUlasan({modal:true, id:id}))}
                className="rounded text-xs  bg-gogreen text-white py-3 px-6 mr-5 flex items-center justify-center hover:bg-green-600"
              >
                Beri Ulasan
              </button>
              ):""}
              
            </div>
            </div>
        </div>
       
    </>
  )
}
