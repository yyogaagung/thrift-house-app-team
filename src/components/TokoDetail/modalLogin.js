import React from "react";
import { useDispatch} from "react-redux";
import { isModalLoginFunc } from "../../action";

export default function ModalLogin(){
    const dispatch = useDispatch();
    
    return(
        <div className="w-full h-full bg-black-rgba fixed z-50 left-0 right-0  top-0 bottom-0">
            <div className="w-72 md:w-100 h-auto rounded-lg p-5 mx-auto shadow-lg bg-slate-50 mt-56">
                <button className="w-full flex justify-end" onClick={()=>dispatch(isModalLoginFunc(false))}>X</button>
                <p className="font-bold text-lg flex justify-center items-center text-gogreen mb-2">Kamu Belum Login</p>
                <p className="text-sm flex justify-center items-center mb-8">Silahkan Login Terlebih dahulu</p>
                <a
                onClick={()=>dispatch(isModalLoginFunc(false))}
                href="/login"
                className="flex justify-center items-center px-6 py-2 text-sm font-semibold text-green-800 bg-blue-100"
                >Ke Halaman Login
                </a>
            </div>
        </div>
    )

}