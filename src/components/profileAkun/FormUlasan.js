import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector} from "react-redux";
import { Icon } from '@iconify/react';
import { displayModalUlasan } from '../../action';
import axios from 'axios';

export default function FormUlasan({}) {
  const dispatch = useDispatch();
  const [rating, setRating] = useState(0)
  const [orderDetail, setOrderDetail] = useState([])
  const [store, setstore] = useState([])
  const [loading, setLoading] = useState(false)
  const {id} = useSelector((state) => state.login);
  const {idOrderUlasan} = useSelector((state) => state.isModalUlasan);
  
  //input form
  const [dataimg, setdataimg] = useState([]);
  const [displayimg, setdisplayimg] = useState([]);
  const [form, setForm] = useState({
    anonim: false,
    description: "",
    photos: "",
  });
  


  useEffect(()=>{
    setLoading(true)
    axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/orders/${idOrderUlasan}`)
    .then(res => {
      setOrderDetail(res.data.data)
      setstore(res.data.data.store)
      setLoading(false)
    })
    .catch(err =>{
      console.log(err)
      setLoading(false)
    })
  },[id, idOrderUlasan])



  const formHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file)
      );

      // console.log("filesArray: ", filesArray);

      setdisplayimg((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => URL.revokeObjectURL(file) // avoid memory leak
      );
    }
    // console.log(e.target.files[])
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => file);

      // console.log("filesArray: ", filesArray);

      setdataimg((prevImages) => prevImages.concat(filesArray));
      Array.from(e.target.files).map(
        (file) => file // avoid memory leak
      );
    }
  };

  const renderPhotos = (source) => {
    // console.log("source: ", source);
    return source.map((photo) => {
      return <img src={photo} alt="" key={photo} className='w-[150px] h-[150px] object-cover p-1' />;
    });
  };
  console.log(form.anonim, "ini anonim");
  console.log(form.description, "ini description");
  console.log(rating,"ini rating")
  return (
    <>

        <div className="w-full">
        <div className='flex justify-between items-center'>
        <div className='w-full flex flex-col justify-between items-start '>
            {store.map(el => 
              (
              <div className=' w-full mb-5'>
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
                    <form className='flex flex-col items-center justify-center mt-10'>
                        <p className='font-bold text-xs md:text-sm mb-2 text-black'>Beri Ulasan</p>
                        <p className='text-xs md:text-sm mb-2 text-gray-500'>Berikan ulasan untuk produk ini</p>
                        <div className="star-rating">
                            {[...Array(5)].map((star, index) => {
                              index += 1;
                              return (
                                <button
                                  type="button"
                                  key={index}
                                  className={`${index <= rating ? "text-[#D8A901]" : "text-[#999]"} bg-transparent border-0 outline-none cursor-pointer text-5xl sm:text-7xl`}
                                  onClick={() => setRating(index)}
                                >
                                  <span className="star">&#9733;</span>
                                </button>
                              );
                            })}
                      </div>
                        <p className='font-bold text-xs md:text-sm mb-2 text-black mt-10'>Tuliskan Ulasanmu</p>
                        <p className='text-xs md:text-sm mb-2 text-gray-500'>Berikan ulasan untuk produk ini</p>
                        <textarea id="message" name='description' rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Tulis ulasan prduk disini... " onChange={formHandler}></textarea>
                        

                        <div className='w-full '>
                        <div className="result  w-full mt-4 flex flex-wrap items-center justify-start">{renderPhotos(displayimg)}</div>
                        <div>
                          <input type="file" id="file" multiple onChange={handleImageChange} className='hidden'/>
                          <div className="label-holder w-full h-[50px] mt-0 flex items-center">
                            <label htmlFor="file" className="label  bg-gogreen text-white  text-sm cursor-pointer flex p-3 rounded-lg">
                            <Icon icon="material-symbols:add-circle-outline" /> 
                            <p className='text-xs ml-2'>Tambah Foto dan Video</p>
                            </label>
                          </div>
                         
                        </div>
                        </div>

                        <div className='w-full mt-4'> 
                        <label className='text-xs md:text-sm mb-2 text-gray-500 '>
                            <input type="checkbox"
                                onChange={(e) =>
                                    setForm((prev) => ({
                                    ...prev,
                                    anonim: e.target.checked,
                                    }))
                                }
                            />
                        Tampilkan username pada penilaian
                        </label>
                        </div>
                        
                        <div className=' w-full flex justify-end'>
                          <button
                          onClick={e => dispatch(displayModalUlasan(false))}
                          className="py-2 px-7 text-xs font-medium border-2 border-gogreen rounded-md text-gogreen hover:bg-gray-50 mr-5 "
                          >
                          Batalkan
                          </button>
                          <button
                          className="py-2 px-7 text-xs   hover:bg-gray-100 hover:text-gray-600 text-white rounded-md bg-gogreen font-semibold mr-5"
                          >
                          Kirim Ulasan
                          </button>
                        </div>
                        
                        
                    </form>
                
              </div>
              
            )            
            )}
            </div>
        </div>
            </div>
       
    </>
  )
}
