import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import axios from "axios";

const ModalCourier = ({
  isCourierOpen,
  setIsCourierOpen,
  setShippingCost,
  setSelectedCourier,
  setSelectedService,
  item,
  selectedAlamat,
}) => {
  const closeModalOutside = useRef();

  const [flow, setFlow] = useState(1);
  const [tempSelectedService, setTempSelectedService] = useState("");
  const [tempShippingCost, setTempShippingCost] = useState({});
  const [tempSelectedCourier, setTempSelectedCourier] = useState("");
  const [service, setService] = useState([]);

  // handle submit when choose courier on modal
  const submitSelectedCourierHandler = () => {
    // .post(`https://thrifthouse.herokuapp.com/api/v1/rajaongkir/cost`, {
    //   courier: tempSelectedCourier,
    //   destination: item.store.city_id,
    //   origin: selectedAlamat.idCity,
    //   weight: item.product[0].weight,
    // })

    setFlow(2);
    axios
      .get(
        `https://rajaongkir.vercel.app/cost?origin=${selectedAlamat.idCity}&destination=${item.store.city_id}&weight=${item.product[0].weight}&courier=${tempSelectedCourier}`
      )
      .then((res) => {
        setService(res.data.rajaongkir.results[0].costs);
      })
      .catch((err) => console.log(err));
  };

  // set selected service to state
  const selectedServiceHandler = (item) => {
    setTempSelectedService(item.service);
    setTempShippingCost(item.cost[0]);
  };

  // handle submit when choose service on modal
  const submitSelectedServiceHandler = () => {
    setIsCourierOpen(false);
    setSelectedCourier(tempSelectedCourier);
    setSelectedService(tempSelectedService);
    setShippingCost(tempShippingCost);
  };

  return (
    <div
      className={`modal ${
        isCourierOpen ? "block" : "hidden"
      } justify-center items-center fixed z-10 left-0 top-0 w-full h-full overflow-auto bg-[#1F1F1F]/60 py-[145px]`}
      ref={closeModalOutside}
      onClick={(e) =>
        e.target === closeModalOutside.current && setIsCourierOpen(false)
      }
    >
      <div className="modalContent bg-white max-w-[947px] mx-6 md:mx-auto px-6 md:px-20 py-10 rounded-lg relative">
        <Icon
          icon="ph:x-circle-fill"
          height="40"
          className="absolute right-5 md:right-10 top-7 cursor-pointer"
          onClick={() => setIsCourierOpen(false)}
        />
        {/* flow 1 */}
        {flow === 1 && (
          <>
            <h3 className="font-bold text-sm md:text-2xl text-center mb-3">
              Pilih Jasa Pengiriman
            </h3>
            <p className="text-[#8F8F8F] text-center text-lg mb-10">
              Pilih layanan kurir yang ingin kamu gunakan
            </p>

            <div className="thisiscouriercontainer mb-16">
              <div
                className={`thisiscourierpengiriman mb-10 border-[1px] p-4 rounded-lg flex flex-col md:flex-row items-center cursor-pointer hover:border-gogreen ${
                  tempSelectedCourier === "jne"
                    ? "border-gogreen"
                    : "border-[#CECFD7]"
                }`}
                onClick={() => setTempSelectedCourier("jne")}
              >
                <div className="md:mr-9 w-[234px] h-[120px]">
                  <img
                    src="/images/jne.png"
                    alt="jne"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="mb-2 font-bold text-xl">
                    Jalur Nugraha Ekakurir (JNE)
                  </p>
                  <p className="text-lg">
                    Ongkos Kirim Ekonomis (OKE) | Layanan Reguler (REG) | Super
                    Speed (SPS) | Yakin Esok Sampai (YES)
                  </p>
                </div>
              </div>
              <div
                className={`thisiscourierpengiriman mb-10 border-[1px] p-4 rounded-lg flex flex-col md:flex-row items-center cursor-pointer hover:border-gogreen ${
                  tempSelectedCourier === "pos"
                    ? "border-gogreen"
                    : "border-[#CECFD7]"
                }`}
                onClick={() => setTempSelectedCourier("pos")}
              >
                <div className="md:mr-9 w-[234px] h-[120px]">
                  <img
                    src="/images/pos.png"
                    alt="pos"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="mb-2 font-bold text-xl">POS INDONESIA</p>
                  <p className="text-lg">
                    Pos Kilat Khusus (Reguler) - 2-4 hari
                  </p>
                </div>
              </div>
              <div
                className={`thisiscourierpengiriman border-[1px] p-4 rounded-lg flex flex-col md:flex-row items-center cursor-pointer hover:border-gogreen ${
                  tempSelectedCourier === "tiki"
                    ? "border-gogreen"
                    : "border-[#CECFD7]"
                }`}
                onClick={() => setTempSelectedCourier("tiki")}
              >
                <div className="md:mr-9 w-[234px] h-[120px]">
                  <img
                    src="/images/tiki.png"
                    alt="tiki"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex-1">
                  <p className="mb-2 font-bold text-xl">TIKI</p>
                  <p className="text-lg">
                    Reguler Service (REG) | Over Night Service (ONS)
                  </p>
                </div>
              </div>
            </div>

            <div
              className="font-medium text-lg text-center text-white bg-gogreen py-[14px] rounded-lg cursor-pointer"
              onClick={submitSelectedCourierHandler}
            >
              Pilih & Lanjut
            </div>
          </>
        )}
        {/* end flow 1 */}

        {/* flow 2 */}
        {flow === 2 && (
          <>
            <h3 className="font-bold text-2xl text-center mb-3">
              Pilih Services Pengiriman
            </h3>
            <p className="text-[#8F8F8F] text-center text-lg mb-10 max-w-[578px] mx-auto">
              Estimasi tanggal diterima tergantung pada waktu pengemasan Penjual
              dan waktu pengiriman ke lokasi kamu
            </p>

            <div className="thisisservicecontainer mb-16">
              {service.length !== 0 &&
                service.map((item) => (
                  <div
                    key={item.service}
                    className={`thisisservicepengiriman mb-10 border-[1px] p-6 rounded-lg flex items-center justify-between space-x-6 cursor-pointer hover:border-gogreen ${
                      tempSelectedService === item.service
                        ? "border-gogreen"
                        : "border-[#CECFD7]"
                    }`}
                    onClick={() => selectedServiceHandler(item)}
                  >
                    <div className="font-bold text-xl">
                      {item.description} ({item.service})
                    </div>
                    <div className="text-lg flex-1  text-right">
                      Akan diterima pada {item.cost[0].etd} hari
                    </div>
                    <div className="font-bold text-xl text-gogreen">
                      Rp{item.cost[0].value}
                    </div>
                  </div>
                ))}
            </div>

            <div
              className="font-medium text-lg text-center text-white bg-gogreen py-[14px] rounded-lg cursor-pointer"
              onClick={submitSelectedServiceHandler}
            >
              Pilih & Selesai
            </div>
          </>
        )}
        {/* end flow 2 */}
      </div>
    </div>
  );
};

export default ModalCourier;
