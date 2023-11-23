import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { listprovinsi } from "../../utils/provinsi";
import { useNavigate } from "react-router-dom";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    padding: "6px",
    marginTop: "8px",
    borderRadius: "6px",
    borderColor: "#CFCFCF",
  }),
  placeholder: (provided, state) => ({ ...provided, color: "#CFCFCF" }),
};

const FormAlamat = () => {
  const [isloading, setIsloading] = useState(false)
  const [error, setError] = useState([])
  const [modal, setModal] = useState(false);
  const [berhasil, setBerhasil] = useState (false);
  const [gagal, setGagal] = useState (false);
  console.log(modal,"mo")
  const [cityOptions, setCityOptions] = useState([]);
  const [form, setForm] = useState({
    addressLabel: false,
    city: "",
    detail: "",
    district: "",
    fullAddress: "",
    idCity: "",
    idProvince: "",
    postalCode: "",
    province: "",
    recipientName: "",
    recipientPhone: "",
    village: "",
  });
  const { id } = useSelector((state) => state.login);
  let navigate = useNavigate();
  const formHandler = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const cityHandler = (e) => {
    setForm((prev) => ({
      ...prev,
      city: e.city_name,
      idCity: e.city_id,
      idProvince: e.province_id,
      province: e.province,
    }));
  };

  const provinsiHandler = (e) => {
    axios
      .get(`https://rajaongkir.vercel.app/city?province=${e.province_id}`)
      .then((res) => {
        setCityOptions(res.data.rajaongkir.results);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const submitAlamat = (e) => {
    setIsloading(true)
    e.preventDefault();
    // console.log(form);
    if (id) {
      axios
        .post(
          `https://thrifthouse.herokuapp.com:443/api/v1/users/${id}/addresses`,
          form
        )
        .then((res) => {
          setModal(false)
          setBerhasil(true);
          setIsloading(false)
        })
        .catch((err) => {
          console.log(err);          
          setModal(false);
          setGagal(true);
          setIsloading(false);
        });
    }
  };

  function sureModal(e) {
    return (
      <>
        {isloading ? (
                    <div className="w-full bg-black-rgba fixed z-50 top-0 bottom-0 left-0 right-0 p-6 flex justify-center items-center mx-auto "><div className='bg-white p-10'><div className="w-7 h-7 sm:w-9 sm:h-9 border-4 border-l-gogreen rounded-full animate-spin"></div></div></div>
                )
                :
                (
                  <div className="bg-black-rgba fixed flex z-50 top-0 bottom-0 left-0 right-0 p-6">
            <div className="bg-white rounded-lg m-auto  overflow-hidden">
            <div className=" px-14 pt-7 pb-6">
                <p className="font-bold text-sm mb-2">Apakah kamu yakin?</p>
                <p className="text-xs">
                Lakukan <span className="text-gogreen font-semibold">konfirmasi</span> hanya  jika data alamat baru sudah sesuai.
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
                    onClick={submitAlamat}
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
                <p className="font-bold text-sm mb-2">Tambah Alamat berhasil</p>
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
                <p className="font-bold text-sm mb-2">Password gagal diubah</p>
                <p className="text-xs">
                Periksa kembali password yang kamu masukan
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

  function handleModal(e) {
    e.preventDefault(); 
    setModal(true)
}

  return (
    <div className="thisisalamat customcontainer mx-auto my-0 px-6 sm:px-0">
      <h2 className="text-center font-bold text-base sm:text-2xl mb-10">
        Alamat Pengiriman
      </h2>
      <div className="max-w-[784px] mx-auto">
        <form onSubmit={handleModal}>
          <h3 className="font-bold text-sm sm:text-xl mb-4">
            Informasi kontak
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mb-6">
            <div className="mb-2 sm:mb-0">
              <label htmlFor="nama" className="text-xs sm:text-base">
                Nama penerima
              </label>
              <input
                type="text"
                id="nama"
                placeholder="Contoh: Robert"
                name="recipientName"
                onChange={formHandler}
                className="w-full mt-2 border-[1px] border-[#CFCFCF] p-3 rounded-md placeholder:text-[#CFCFCF] placeholder:text-sm sm:placeholder:text-base"
              />
            </div>
            <div>
              <label htmlFor="telp" className="text-xs sm:text-base">
                Nomor telepon
              </label>
              <input
                type="text"
                id="telp"
                placeholder="Contoh: +62 xxx xxxx xxxx"
                name="recipientPhone"
                onChange={formHandler}
                className="w-full mt-2 border-[1px] border-[#CFCFCF] p-3 rounded-md placeholder:text-[#CFCFCF] placeholder:text-sm sm:placeholder:text-base"
              />
            </div>
          </div>

          <h3 className="font-bold text-sm sm:text-xl mb-4">
            Informasi alamat
          </h3>
          <div className="mb-6">
            <label htmlFor="alamatlengkap" className="text-xs sm:text-base">
              Alamat lengkap
            </label>
            <textarea
              name="fullAddress"
              id="alamatlengkap"
              cols="10"
              rows="3"
              onChange={formHandler}
              placeholder="Contoh: Perum Griya Asa Blok 5 No.76"
              className="resize-none w-full mt-2 border-[1px] border-[#CFCFCF] p-3 rounded-md placeholder:text-[#CFCFCF] placeholder:text-sm sm:placeholder:text-base"
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mb-6">
            <div className="mb-2 sm:mb-0">
              <label htmlFor="provinsi" className="text-xs sm:text-base">
                Provinsi
              </label>
              <Select
                options={listprovinsi}
                getOptionLabel={(option) => option.province}
                getOptionValue={(option) => option.province_id}
                styles={customStyles}
                inputId={"provinsi"}
                placeholder={"Contoh: Provinsi Jawa Barat"}
                onChange={provinsiHandler}
                classNamePrefix="custom"
              />
            </div>
            <div>
              <label htmlFor="kota" className="text-xs sm:text-base">
                Kota / Kabupaten
              </label>
              <Select
                options={cityOptions}
                getOptionLabel={(option) => option.city_name}
                getOptionValue={(option) => option.city_id}
                styles={customStyles}
                inputId={"kota"}
                placeholder={"Contoh: Kabupaten Bandung"}
                onChange={cityHandler}
                classNamePrefix="custom"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mb-6">
            <div className="mb-2 sm:mb-0">
              <label htmlFor="kecamatan" className="text-xs sm:text-base">
                Kecamatan
              </label>
              <input
                type="text"
                id="kecamatan"
                placeholder="Contoh: Kecamatan Buah Batu"
                name="district"
                onChange={formHandler}
                className="w-full mt-2 border-[1px] border-[#CFCFCF] p-3 rounded-md placeholder:text-[#CFCFCF] placeholder:text-sm sm:placeholder:text-base"
              />
            </div>
            <div>
              <label htmlFor="kelurahan" className="text-xs sm:text-base">
                Kelurahan
              </label>
              <input
                type="text"
                id="kelurahan"
                placeholder="Contoh: Kelurahan Cidahu"
                name="village"
                onChange={formHandler}
                className="w-full mt-2 border-[1px] border-[#CFCFCF] p-3 rounded-md placeholder:text-[#CFCFCF] placeholder:text-sm sm:placeholder:text-base"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 mb-6">
            <div>
              <label htmlFor="kodepos" className="text-xs sm:text-base">
                Kode pos
              </label>
              <input
                type="text"
                id="kodepos"
                placeholder="Contoh: 19210"
                name="postalCode"
                onChange={formHandler}
                className="w-full mt-2 border-[1px] border-[#CFCFCF] p-3 rounded-md placeholder:text-[#CFCFCF] placeholder:text-sm sm:placeholder:text-base"
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="detaillainnya" className="text-xs sm:text-base">
              Detail lainnya (opsional)
            </label>
            <textarea
              name="detail"
              id="detaillainnya"
              cols="10"
              rows="3"
              placeholder="Contoh: Rumah cat putih"
              onChange={formHandler}
              className="resize-none w-full mt-2 border-[1px] border-[#CFCFCF] p-3 rounded-md placeholder:text-[#CFCFCF] placeholder:text-sm sm:placeholder:text-base"
            ></textarea>
          </div>

          <h3 className="font-bold text-sm sm:text-xl mb-4">Pengaturan</h3>
          <div className="mb-4 flex items-center">
            <p className="mr-5 text-xs sm:text-base">
              Tetapkan sebagai alamat utama
            </p>
            <label htmlFor="utama" className="cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  id="utama"
                  className="sr-only"
                  name="addressLabel"
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      addressLabel: e.target.checked,
                    }))
                  }
                />
                <div className="dotbg w-10 h-[15px] sm:w-16 sm:h-[26px] bg-[#C5C5C7] rounded-full shadow-inner transition"></div>
                <div className="dot absolute w-5 h-5 sm:w-8 sm:h-8 bg-white rounded-full shadow-md -left-0 -top-[3px] transition"></div>
              </div>
            </label>
          </div>
          <div className="mb-4 text-[#8F8F8F] text-xs sm:text-base">
            <p>Pastikan kontak dan alamat kamu benar sebelum menyimpan.</p>
          </div>

          {(form.city === "" || form.detail === "" || form.district ==="" || form.fullAddress==="" || form.idCity ==="" || form.idProvince===""||form.postalCode===""|| form.province ==="" || form.recipientName ===""
          || form.recipientPhone ==="" || form.village==="") ? (
            <p className="py-4 bg-gray-100 w-full rounded-lg text-gray-300 flex justify-center">
            Simpan
          </p>
          ):(
            <button className="py-4 bg-gogreen w-full rounded-lg text-white">
            Simpan
          </button>
          )
          }
        </form>
      </div>
      {modal && sureModal()}
      {berhasil && Berhasil()}
      {gagal && Gagal()}
    </div>
  );
};

export default FormAlamat;
