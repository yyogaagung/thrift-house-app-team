import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userDestroyNotif } from '../../action';
import InfoNotif from './InfoNotif';
import PesananNotif from './PesananNotif';
import SemuaNotifikasi from './SemuaNotifikasi';

export default function PesananSaya() {
    const [tabs, setTabs] = useState("Semua");
    const [dataNotifId, setDataNotif] = useState([]);
    const dispatch = useDispatch();
    const { arrNotifId } = useSelector((state) => state.notif);

     useEffect(() => {
           //Remove Redux Notif 
           setDataNotif(arrNotifId.map((dt) => dt.id))
           dispatch(userDestroyNotif());
     }, []);

    const tabsHandler = (e) => {
      setTabs(e.target.textContent);
    };

  return (
    <>
      <div className="sm:w-full mx-auto my-7 px-6 sm:px-0">
        <div className="px-0">
          <div className="thisistabs flex mb-10 justify-around items-center ">
            <div
              className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer ${
                tabs === "Semua"
                  ? "text-gogreen border-b-[1px] border-b-gogreen"
                  : "text-[#AEAEBC]"
              } `}
              onClick={tabsHandler}
            >
              Semua
            </div>
            <div
              className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer ${
                tabs === "Pesanan"
                  ? "text-gogreen border-b-[1px] border-b-gogreen"
                  : "text-[#AEAEBC]"
              }`}
              onClick={tabsHandler}
            >
              Pesanan
            </div>

            <div
              className={`p-[10px] sm:px-1 sm:py-4 text-xs lg:text-base cursor-pointer ${
                tabs === "Info"
                  ? "text-gogreen border-b-[1px] border-b-gogreen"
                  : "text-[#AEAEBC]"
              }`}
              onClick={tabsHandler}
            >
              Info
            </div>
          </div>
        </div>

        {tabs === "Semua" ? <SemuaNotifikasi dataNotifId={dataNotifId} tab={tabs} /> : ""}
        {tabs === "Pesanan" ? <PesananNotif dataNotifId={dataNotifId} tab={tabs} /> : ""}
        {tabs === "Info" ? <InfoNotif dataNotifId={dataNotifId} tab={tabs} /> : ""}
      </div>
    </>
  );
}
