import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardNotifikasi from './CardNotifikasi'

export default function InfoNotif({tab, dataNotifId}) {
    console.log(tab,"tabs")
    const [dataNotif, setDataNotif] = useState([])
    const [loading, setLoading] = useState(false)
    const {id} = useSelector((state) => state.login);

    useEffect(()=>{
        setLoading(true)
        axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/notifications?type=${tab}`)
        .then(respone =>{
            setDataNotif(respone.data.data)
            setLoading(false)
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)})
    },[])

  return (
    <>
      {loading ? (
        <div className="text-center text-gray-400 h-[470px] ">Loading...</div>
      ) : (
        <div className="overflow-y-auto scrollbar-hide h-[470px] ">
          {dataNotif.map((el) => (
            <CardNotifikasi
              active={dataNotifId.includes(el.id)}
              img={el.image}
              title={el.title}
              body={el.body}
              status={el.status}
              type={el.type}
              updatedAt={el.updatedAt}
            />
          ))}
        </div>
      )}
    </>
  );
}

