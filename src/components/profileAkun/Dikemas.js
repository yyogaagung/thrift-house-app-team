import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardPesanan from './CardPesanan'
import { useSelector } from 'react-redux/es/exports'

export default function Dikemas() {
  const [dataOrder, setDataOrder] = useState([])
  const [loading, setLoading] = useState(false)
  const {id} = useSelector((state) => state.login);

  useEffect(()=>{
    setLoading(true)
    axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/orders?status=dikemas`)
    .then(res => {
      setDataOrder(res.data.data)
      setLoading(false)
    })
    .catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[id])

  return (
    <>
    {loading ? <div className='text-center text-gray-400 h-[470px] '>Loading...</div> : (
      <div className='overflow-auto mb-5'>
        <div className='overflow-y-auto scrollbar-hide h-[470px]'>
          {dataOrder.length === 0 ? <div className='text-center text-gray-400'>Belum ada pesanan</div> : 
            dataOrder.map((el, index) => 
              (
                <CardPesanan
                    key = {index}
                    id = {el.id}
                    orderCode = {el.orderCode}
                    status = {el.status}
                    store = {el.store}
                  />
              )
            )
        }
        </div>
    </div>
    )}

    </>
  )
}
