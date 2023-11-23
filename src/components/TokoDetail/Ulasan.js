import React, { Fragment, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import ModalPhoto from './ModalPhoto'
import UlasanCard from './UlasanCard'

function Ulasan() {
    const [ulasan, setUlasan] = useState([])
    const [page, setPage] = useState(0);
    const [limit, setLimit] = useState(4)
    const [rate, setRate] = useState (5)
    const [hasPoto, setHasPoto] = useState(true)
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [desc, setDesc] = useState([])

    const fetchData = async () => {
            setIsLoading(true)
            const url = `https://thrifthouse.herokuapp.com:443/api/v1/stores/${params.id}/reviews?page=0&size=${limit}&rate=${rate}&hasPhoto=${hasPoto}`;
            try {
            const response = await fetch(url);
            const data = await response.json();
                setUlasan((oldMovies) => {
                if (page === 0) {
                    return data.data.review;
                } else {
                    return [...oldMovies, ...data.data];
                }
                });
                setDesc((oldMovies) => {
                if (page === 0) {
                    return data.data;
                } else {
                    return [...oldMovies, ...data.data];
                }
                });
                // setMovies(data.Search || data);
        
                setIsLoading(false);
            } catch (error) {
            console.log(error);
            }
        };
        
        useEffect(() => {
            fetchData()
          }, [params.id, page, limit, hasPoto, rate]);
    
          const loadMore = () => {
            setLimit((oldPage) => {
              return oldPage + 5;
            });
          };
          console.log(desc)
  return (
    <Fragment>
        <div className="customcontainer  mx-auto p-7 mb-10 relative shadow-sm shadow-black-rgba">
            <div className=' wrap--navulasan place-content-center'>
                <div className='grid-rating mb-5'>
                    <div className='flex'>
                        <div className='mr-2'>
                            <img
                                className=''
                                src='/images/big_star.png'
                                alt=''
                            />
                        </div>
                        <div className=''>
                            <span className='font-semibold text-xl'>{Math.round(desc.totalRate)}</span><span className='font-light text-sm'>/5.0</span>
                        </div>
                    </div>
                </div>

                <div className='grid-descrating  mb-3'>
                    <p className='text-sm font-semibold'> {desc.totalSelling} orang berbelanja di toko ini</p>
                    <p className='text-sm'>{`${desc.totalRated} rating`} <span>•</span>{` ${desc.totalReview} ulasan`}</p>
                </div>
                <form className='grid-dgnfoto  content-center mb-5'>
                <label>
                <input type="checkbox"
                    defaultChecked={hasPoto}
                    onChange={() => setHasPoto(!hasPoto)}
                />
                Dengan foto
                </label>
                </form>
                <div className='grid-type overflow-auto'>
                    <ul className='flex justify-between'>
                        {rate === 5 ? 
                            (
                                <li onClick={()=>{setRate(5)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3 bg-slate-300'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>5</p>
                        </li>
                            ):
                            (
                                <li onClick={()=>{setRate(5)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>5</p>
                        </li>
                            )
                        }
                        {rate === 4 ? 
                            (
                                <li onClick={()=>{setRate(4)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3 bg-slate-300'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>4</p>
                        </li>
                            ):
                            (
                                <li onClick={()=>{setRate(4)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>4</p>
                        </li>
                            )
                        }
                        {rate === 3 ? 
                            (
                                <li onClick={()=>{setRate(3)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3 bg-slate-300'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>3</p>
                        </li>
                            ):
                            (
                                <li onClick={()=>{setRate(3)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>3</p>
                        </li>
                            )
                        }
                        {rate === 2 ? 
                            (
                                <li onClick={()=>{setRate(2)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3 bg-slate-300'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>2</p>
                        </li>
                            ):
                            (
                                <li onClick={()=>{setRate(2)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>2</p>
                        </li>
                            )
                        }
                        {rate === 1 ? 
                            (
                                <li onClick={()=>{setRate(1)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3 bg-slate-300'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>1</p>
                        </li>
                            ):
                            (
                                <li onClick={()=>{setRate(1)}}  className='flex border-2 rounded-2xl p-1 px-2 mr-3'>
                            <div className='mr-2 w-5 h-5'>
                            <img
                                className=''
                                src='/images/star.png'
                                alt='star'
                            />
                            </div>
                            <p>1</p>
                        </li>
                            )
                        }
                        
                        
                    </ul>
                </div>
               
            </div>
               
        </div>
        
        {ulasan.map((el, index)=>(
            <UlasanCard
             username = {el.user.username}
             date = {el.createdAt}
             desc = {el.description}
             photos = {el.photos}
             rating = {el.rating}
             key={index}/>
        )
        )}
         {/* <div  className="w-full h-28 mt-20 flex flex-col justify-between items-center ">
            {isLoading && <h2 className="">Loading...</h2>}
            <button className="w-auto p-3 rounded-lg text-stone-50 bg-gogreen" onClick={loadMore}>Lihat Lainnya</button>
        </div> */}

    </Fragment>
   
  )
}

export default Ulasan