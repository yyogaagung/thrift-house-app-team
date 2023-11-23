import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const ModalAlamat = ({
  isAlamatOpen,
  setIsAlamatOpen,
  alamat,
  setSelectedAlamat,
}) => {
  const closeModalOutside = useRef();
  const [selectedAlamatTemp, setSelectedAlamatTemp] = useState([]);
  const navigate = useNavigate();

  // handle selected address
  const selectAlamatHandler = (e) => {
    const selected = alamat.find(
      (item) => item.id === e.currentTarget.dataset.id
    );
    setSelectedAlamatTemp(selected);
  };

  // handle submit address
  const changeAlamatHandler = () => {
    setSelectedAlamat(selectedAlamatTemp);
    // setCheckout((prev) => ({ ...prev, addressId: selectedAlamatTemp.id }));
    setIsAlamatOpen(false);
  };

  return (
    <div
      className={`modal ${
        isAlamatOpen ? "block" : "hidden"
      } justify-center items-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[#1F1F1F]/60 py-[145px]`}
      ref={closeModalOutside}
      onClick={(e) =>
        e.target === closeModalOutside.current && setIsAlamatOpen(false)
      }
    >
      <div className="modalContent bg-white max-w-[947px] mx-6 md:mx-auto px-6 md:px-20 py-10 rounded-lg relative">
        <Icon
          icon="ph:x-circle-fill"
          height="40"
          className="absolute right-5 md:right-10 top-7 cursor-pointer"
          onClick={() => setIsAlamatOpen(false)}
        />
        <h3 className="font-bold text-sm md:text-2xl text-center mb-10">
          Pilih Alamat Pengiriman
        </h3>
        <p
          className="font-bold text-[#B4B4B4] text-sm md:text-base border border-[#B4B4B4] rounded border-dashed text-center py-3 cursor-pointer mb-10"
          onClick={() => navigate("/keranjang/alamat")}
        >
          Tambah Alamat Baru
        </p>

        <div className="thisisalamatcontainer mb-16">
          {alamat.map((item) => (
            <div
              className="thisisalamatpengiriman mb-10 cursor-pointer"
              key={item.id}
              data-id={item.id}
              onClick={selectAlamatHandler}
            >
              <div
                className={`border-[1px] p-4 rounded-lg mb-4 hover:border-gogreen ${
                  item === selectedAlamatTemp
                    ? "border-gogreen"
                    : "border-[#CECFD7]"
                }`}
              >
                <p className="mb-2">
                  <span className="font-bold">{item.recipientName}</span>{" "}
                  {item.addressLabel && "(Utama)"}
                </p>
                <p className="mb-2">{item.recipientPhone}</p>
                <p className="mb-2">{item.fullAddress}</p>
                <p className="mb-2">
                  {`${item.province}, ${item.city}, ${item.district}, ${item.village}, ${item.postalCode}`}
                </p>
                <button className="font-bold rounded-lg text-gogreen">
                  Ubah Alamat
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          className="font-medium text-lg text-center text-white bg-gogreen py-[14px] rounded-lg cursor-pointer"
          onClick={changeAlamatHandler}
        >
          Pilih Alamat
        </div>
      </div>
    </div>
  );
};

export default ModalAlamat;
