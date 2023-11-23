import React from 'react'
import { useDispatch } from "react-redux";
import { setSubTabProfile, setTabProfile } from '../../action';
import moment from "moment";

export default function CardNotifikasi({img,   title,    body,    status, type, updatedAt, active}) {
    const dispatch = useDispatch() 
    var newStr
    type === "pesanan" ? newStr =type.replace(/p/g, "P") : newStr =type.replace(/i/g, "I");

    return (
      <>
        <div className="md:px-7 lg:px-20 cursor-pointer">
          <div
            className={`border-[1px] border-[#CECFD7] p-4 rounded-lg mb-4 mt-5 ${
              active ? "bg-[#D4EEE1]" : ""
            }`}
          >
            <div className=" flex flex-col lg:flex-row lg:items-center">
              <div className="flex">
                <div className="flex justify-center items-center rounded-full w-20 h-20  mr-5">
                  <img className="w-full " src={img} alt="logo toko" />
                </div>
                <div>
                  <p className=" text-sm text-[#AEAEBC]">{newStr}</p>
                  <p className="text-sm lg:text-base  font-semibold">{title}</p>
                  <p className="text-sm lg:text-sm lg:font-light font-extralight">
                    {body}
                  </p>
                  <p className="text-sm  text-[#AEAEBC] lg:text-sm font-extralight">
                    {moment(new Date(updatedAt)).format(
                      "DD-MM-YYYY mm:ss"
                    )}
                  </p>
                </div>
              </div>
              {type === "info" ? (
                ""
              ) : (
                <div className="flex justify-end p-2 mt-4 items-center ">
                  <button
                    onClick={() => {
                      dispatch(setTabProfile("Pesanan Saya"));
                      dispatch(setSubTabProfile(status));
                    }}
                    className="py-2 px-7 text-xs font-medium border-2 border-gogreen rounded-md text-gogreen hover:bg-gray-50 "
                  >
                    Lihat
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
}
