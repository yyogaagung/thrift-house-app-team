import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useSelector } from "react-redux";

export default function FormUpdateUser() {
    const [uploadImage, setuploadImage] = useState(null);
    const {id} = useSelector((state) => state.login);
    const [profile, setProfile] = useState([])
    const [berhasil, setBerhasil] = useState (false);
    const [modal, setModal] = useState(false);
    const [gagal, setGagal] = useState (false);
    const [isloading, setIsloading] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState([])


    const handleUpload = async(e) => {
         setuploadImage(e.target.files[0]);
    }
    const [form, setForm] = useState({
        "email":"",
        "fullname":"",
        "gender":"",
        "phone":"",
        "role":"",
        "username":"",
        "birth":"",
      });

      useEffect(()=>{
        setLoading(true)
        axios.get(`https://thrifthouse.herokuapp.com:443/api/v1/users/${id}`)
        .then(respon =>{
            // console.log(respon.data.data)
            setProfile(respon.data.data)
            setLoading(false)

        })
        .catch(err => {
            console.log(err)
            setLoading(false)
        })
      }
      
      
      ,[id])

      const formHandler = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      };

  
   
    const handleSubmit = async (e) => {
        e.preventDefault();
       const formData = new FormData();
       formData.append("username", (form.username === "" ? profile.username : form.username));
       formData.append("fullname", (form.fullname === "" ? profile.fullname : form.fullname));
       formData.append("email", (form.email === "" ? profile.email : form.email));
       formData.append("phone", (form.phone === "" ? profile.phone : form.phone));
       formData.append("gender", (form.gender === "" ? profile.gender : form.gender));
       var newStr =form.birth.replace(/-/g, "/");
       formData.append("birth", (form.birth === "" ? profile.birth : newStr));
       if(uploadImage){
        formData.append("profileImg", uploadImage);
       }
        
       try {
        setIsloading(true)
         const test = await axios.putForm(
           `https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/profile`,
           formData
           
         );
         console.log(test);
         setModal(false);
         setBerhasil(true)
         setIsloading(false)
       } catch (error) {
        console.log(error)
         setError(error)
         setModal(false)
         setGagal(true)
         setIsloading(false)
       }
    }
    function handleModal(e) {
        e.preventDefault(); 
        setModal(true)
    }

    function sureModal(e) {
        return (
            <>
                {isloading ? (
                    <div className="w-full bg-black-rgba fixed z-50 top-0 bottom-0 left-0 right-0 p-6 flex justify-center items-center mx-auto "><div className='bg-white p-10'><div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin"></div></div></div>
                )
                :
                (
                    <div className="bg-black-rgba fixed flex z-50 top-0 bottom-0 left-0 right-0 p-6">
                <div className="bg-white rounded-lg m-auto  overflow-hidden pb">
                <div className=" px-14 pt-7 pb-6">
                    <p className="font-bold text-sm mb-2">Apakah kamu yakin?</p>
                    <p className="text-xs">
                    Jika tekan <span className='text-gogreen font-semibold'>Konfirmasi</span> hanya jika biodata diri sudah sesuai.
                    </p>
                </div>
                <div className="flex justify-end p-2">
                    <button
                    type="button"
                    onClick={(e) => setModal(!modal)}
                    className="py-2 px-7 text-xs   hover:bg-gray-100 hover:text-gray-600 text-white rounded-md bg-gogreen font-semibold mr-5"
                    >
                    Batalkan
                    </button>
                    <button
                    onClick={handleSubmit}
                    className="py-2 px-7 text-xs font-medium border-2 border-gogreen rounded-md text-gogreen hover:bg-gray-50 "
                    >
                    Konfirmasi
                    </button>
                </div>
                </div>
            </div>
                )}
               
            </>
            
        );
      }

      function Berhasil(e) {
        return (
            <div className="bg-black-rgba fixed flex z-50 top-0 bottom-0 left-0 right-0 p-6">
                <div className="bg-white rounded-lg m-auto  overflow-hidden">
                <div className=" px-14 pt-7 pb-6">
                    <p className="font-bold text-sm mb-2">Biodata diri berhasil diubah</p>
                    <p className="text-xs">
                    Muat ulang halaman anda
                    </p>
                </div>
                <div className="flex">
                    <button
                    type="button"
                    onClick={(e) => setBerhasil(!berhasil)}
                    className="flex-grow py-4 text-xsborder-[0.3px] hover:bg-gray-100 text-gogreen font-semibold"
                    >
                    Ok
                    </button>
                </div>
                </div>
            </div>
        );
      }

      function Gagal(e) {
        return (
            <div className="bg-black-rgba fixed flex z-50 top-0 bottom-0 left-0 right-0 p-6">
                <div className="bg-white rounded-lg m-auto  overflow-hidden">
                <div className=" px-14 pt-7 pb-6">
                    <p className="font-bold text-sm mb-2">{error.code} {error.response.status}</p>
                    <p className="text-xs">
                    Pastikan inputan yang kamu masukan sudah benar
                    </p>
                </div>
                <div className="flex">
                    <button
                    type="button"
                    onClick={(e) => setGagal(!gagal)}
                    className="flex-grow py-4 text-xsborder-[0.3px] hover:bg-gray-100 text-gogreen font-semibold"
                    >
                    Ok
                    </button>
                </div>
                </div>
            </div>
        );
      }
    

  return (
   <>
    <form className='customcontainer mx-auto my-7 px-6 sm:px-0 flex flex-wrap justify-around' onSubmit={handleModal}>
    <div className=''>
    <label htmlFor="Username" className='flex flex-col py-3 px-2 text-sm lg:text-base'>
            Username:</label>
            <input type="text" name="username" id='Username' value={profile.username}  className='border-2 w-80 sm:w-60 lg:w-80 p-2 rounded-md text-sm'  onChange={formHandler}/>
        
            <label htmlFor="fullname" className='flex flex-col py-3 px-2 text-sm lg:text-base'>
            Nama Lengkap:</label>
            {profile.fullname === null ? (
                <input type="text" name="fullname" id='fullname'  placeholder={'Masukan nama lengkap'} className='border-2 w-80 sm:w-60 lg:w-80  p-2 rounded-md text-sm' onChange={formHandler}/>
            ):
            (
                <input type="text" name="fullname" id='fullname' value={profile.fullname} className='border-2 w-80 sm:w-60 lg:w-80  p-2 rounded-md text-sm' onChange={formHandler}/>
            )}
            
       
        <label htmlFor="email" className='flex flex-col py-3 px-2 text-sm lg:text-base'>
            Email:</label>
            <input type="email" name="email" id='email' value={profile.email}  className='border-2 w-80 sm:w-60 lg:w-80 p-2 rounded-md text-sm'  onChange={formHandler}/>

        <p  className='flex flex-col  px-2 text-sm lg:text-base mt-4'>Jenis Kelamin</p>
        {profile.gender === null ? (
            <div className='w-60 flex justify-between py-3 px-3'>
            <label htmlFor="gender" className='flex flex-col py-3 px-2 text-sm lg:text-base'></label>
            <input type="radio"  name="gender" id='gender'  value={'M'} className='mr-3 scale-150' onChange={formHandler}/>Male
        
            <label htmlFor="gender" className='flex flex-col py-3 px-2 text-sm lg:text-base'></label>
            <input type="radio" name="gender" id='gender' value={'F'} className='mr-3 scale-150' onChange={formHandler}/>Female
            
        </div>
        ):
        (
            (profile.gender === "M") ? (
            <div className='w-60 flex justify-between py-3 px-3'>
            <label htmlFor="gender" className='flex flex-col py-3 px-2 text-sm lg:text-base'></label>
            <input type="radio" name="gender" id='gender' value={'M'}  className='mr-3 scale-150 '  defaultChecked={true} onChange={formHandler}/>Male
            <label htmlFor="gender" className='flex flex-col py-3 px-2 text-sm lg:text-base'></label>
            <input type="radio"  name="gender" id='gender' value={'F'} className='mr-3 scale-150 ' onChange={formHandler}/>Female
        </div>
        ) : (
            <div className='w-60 flex justify-between py-3 px-3'>
            <label htmlFor="gender" className='flex flex-col py-3 px-2 text-sm lg:text-base'></label>
            <input type="radio"  name="gender" id='gender' value={'M'} className='mr-3 scale-150' onChange={formHandler}/>Male
            <label htmlFor="gender" className='flex flex-col py-3 px-2 text-sm lg:text-base'></label>
            <input type="radio"  name="gender" id='gender' value={'F'} className='mr-3 scale-150 ' onChange={formHandler}/>Female
        </div>
        ) 

            
            
        )
        }
        
       

        <label htmlFor="phone" className='flex flex-col py-3 px-2 text-sm lg:text-base'> Nomor Telepon:</label>           
            <input type="text" name="phone" id='phone' value={profile.phone} className='border-2 w-80 sm:w-60 lg:w-80  p-2 rounded-md text-sm' onChange={formHandler}/>


            <label htmlFor="birth" className='flex flex-col py-3 px-2 text-sm lg:text-base'>Tanggal Lahir:</label>            
            <input type="date" name="birth" id='birth'   className='border-2 w-80 sm:w-60 lg:w-80 p-2 rounded-md text-sm' onChange={formHandler}/>
    </div>
       

        <div className='flex flex-col items-center mt-10 md:mt-0'>
            <div className='w-40 h-40 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-neutral-100 flex justify-center items-center p-2 rounded-md'>
                <img
                    className='w-9/12 rounded-full'
                    src={profile.profileImg}
                    alt='profile'
                />
            </div>
            <div>
            <div className="flex w-full items-center justify-center bg-grey-lighter mt-4 ">
            <label className="w-40 sm:w-36 flex flex-col items-center px-2 py-2 border-2 border-gogreen  rounded-lg cursor-pointer">
            <span className=" text-sm leading-normal text-gogreen">Pilih Gambar</span>
            <input type='file' className="hidden "  onChange={handleUpload}/>
            </label>
        </div>
        </div>
        {(form.email=== "" && form.fullname === "" && form.gender===""&& form.phone === ""&& form.username==="" && form.birth==="" &&  !uploadImage) ? (
            <div className='flex  items-center mt-16'>
            <p className='bg-gray-100 text-gray-400 w-52 py-2 rounded-md flex justify-center mt-5'>Simpan</p>
        </div>
        ):(
            <div className='flex  items-center mt-16'>
            <button className='bg-gogreen text-white w-52 py-2 rounded-md flex justify-center mt-5'>Simpan</button>
        </div>
        )}

      

        </div>
        
        
       
    </form>
    {modal && sureModal()}
    {berhasil && Berhasil()}
    {gagal && Gagal()}
   </>
  )
}
