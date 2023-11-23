import React, { useEffect } from "react";

export default function ErrorPage(){
  function scrollWin() {
    window.scrollTo(0, 0);
  }

  useEffect(()=>{
    scrollWin();
  },[])
    return(

      <div className="customcontainer mx-auto flex  items-center justify-center  bg-gradient-to-r  from-gogreen to-green-300 p-10 ">
      <div className=" bg-white p-10 rounded-md shadow-xl">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-yellow-500 text-9xl">404</h1>

          <p className="mb-2 text-base font-bold text-center text-gray-800 md:text-lg">
            <span className="text-red-500 ">Oops!</span> Halaman tidak tersedia
          </p>

          <p className="mb-8 text-center text-gray-500 md:text-lg">
            Pastikan URL yang kamu masukan benar
          </p>

          <a
            href="/"
            className="px-6 py-2 text-sm font-semibold text-green-800 bg-blue-100"
            >Kembali</a>
          </div>
      </div>
    </div>
  )
}