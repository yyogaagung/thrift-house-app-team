import React from 'react'
import { useDispatch} from "react-redux";
import { isModalPotoUlasanFunc } from '../../action';

function ModalPhoto(props) {
    const dispatch = useDispatch();
  return (
    <div>
        <div className="w-full h-full bg-black-rgba fixed z-30 left-0 right-0  top-0 bottom-0">
            <div className=" marker:w-72 md:w-100 h-auto rounded-lg p-5 mx-auto shadow-lg bg-slate-50 mt-36">
                <button className="w-full flex justify-end" onClick={()=>dispatch(isModalPotoUlasanFunc(false))}>X</button>
               <div  className='w-full h-1/2'>
                    <img
                        className='w-full'
                        src={props.pilihPoto}
                        alt='ulasan'
                    />
               </div>
            </div>
        </div>
    </div>
  )
}

export default ModalPhoto