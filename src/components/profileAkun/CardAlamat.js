import React from 'react'
import Spinner from '../Spinner'

export default function CardAlamat({penerima, noPenerima, fullAdress, propinsi, city, district, village, postalCode, addressLabel }) {
  return (
    <>
    <div className='md:px-7 lg:px-20'>
      <div className="border-[1px] border-[#CECFD7] p-4 rounded-lg mb-4 mt-10 ">
        <div className='flex justify-between'>
        <p className="mb-2 text-sm lg:text-base">
                        <span className="font-bold">
                          {penerima}
                        </span>{" "}
                        {addressLabel && "(Utama)"}
          </p>

          <p className='text-orange-600'>Ubah</p>
        </div>
                    
                    <p className="mb-2 text-xs lg:text-base">
                      {noPenerima}
                    </p>
                    <p className="mb-2 text-xs lg:text-base">
                      {fullAdress}
                    </p>
                    <p className="text-xs lg:text-base">
                      {`${propinsi}, ${city}, ${district}, ${village}, ${postalCode}`}
                    </p>
        </div>
    </div>
       
    </>
  )
}
