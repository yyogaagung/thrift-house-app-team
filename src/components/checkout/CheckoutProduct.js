import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ModalCourier from "./ModalCourier";

const CheckoutProduct = ({
  item,
  selectedAlamat,
  setTotalShippingCost,
  setTransactions,
}) => {
  const [isCourierOpen, setIsCourierOpen] = useState(false);
  const [selectedCourier, setSelectedCourier] = useState("pos");
  const [selectedService, setSelectedService] = useState("REG");
  const [detailCourier, setDetailCourier] = useState([]);
  const [shippingCost, setShippingCost] = useState({ value: 0, etd: "1-3" });
  const prevCountRef = useRef();

  // set transactions state
  useEffect(() => {
    setTransactions((prev) => {
      const clonePrev = JSON.parse(JSON.stringify(prev));
      const findIndex = clonePrev.findIndex((e) =>
        e.productIds.includes(item.product[0].id)
      );
      if (clonePrev.length > 0) {
        clonePrev[findIndex].deliveryService = selectedCourier;
        clonePrev[findIndex].shippingService = selectedService;
        clonePrev[findIndex].shippingCost = shippingCost.value;
        clonePrev[findIndex].estimatedTimeOfDeparture = shippingCost.etd;
      }
      return clonePrev;
    });
  }, [
    item.product,
    shippingCost,
    setTransactions,
    selectedCourier,
    selectedService,
  ]);

  // get shipping cost from rajaongkir
  useEffect(() => {
    // .post(`https://thrifthouse.herokuapp.com/api/v1/rajaongkir/cost`, {
    //       courier: selectedCourier,
    //       destination: item.store.city_id,
    //       origin: selectedAlamat.idCity,
    //       weight: item.product[0].weight,
    //     })

    if (selectedAlamat.idCity) {
      axios
        .get(
          `https://rajaongkir.vercel.app/cost?origin=${selectedAlamat.idCity}&destination=${item.store.city_id}&weight=${item.product[0].weight}&courier=${selectedCourier}`
        )
        .then((res) => {
          setShippingCost(() => {
            const defaultCourier = res.data.rajaongkir.results[0].costs.find(
              (item) => item.service === selectedService
            )?.cost[0];
            return defaultCourier
              ? defaultCourier
              : res.data.rajaongkir.results[0].costs[0]?.cost[0];
          });
          setDetailCourier(res.data.rajaongkir.results[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [
    item.product,
    item.store.city_id,
    selectedAlamat.idCity,
    selectedCourier,
    selectedService,
  ]);

  // set total shipping cost to state in parent component
  useEffect(() => {
    if (shippingCost.value !== 0) {
      setTotalShippingCost((prev) => {
        const index = prev.indexOf(prevCountRef.current);
        if (index !== -1) {
          let newPrev = [...prev];
          newPrev[index] = shippingCost.value;
          return newPrev;
        } else {
          return [...prev, shippingCost.value];
        }
      });
    }
  }, [shippingCost.value, setTotalShippingCost]);

  // track previous shipping cost to determine which index to update
  useEffect(() => {
    prevCountRef.current = shippingCost.value;
  }, [shippingCost.value]);

  return (
    <div
      key={item.store.id}
      className="shadow-[0px_0.5px_10px_rgba(0,0,0,0.15)] rounded-lg mb-6"
    >
      <div className="px-5 py-6 flex items-center border-b-[1px] border-b-[#CECFD7]">
        <div className="w-12 h-12 rounded-full mr-3">
          <img
            src={item.store.photo}
            alt={item.store.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div>
          <p className="font-bold text-xs md:text-base">{item.store.name}</p>
          <p className="text-xs md:text-base">
            {`${item.store.city}, ${item.store.province}`}
          </p>
        </div>
      </div>

      {item.product.map((product) => (
        <div
          key={product.id}
          className="px-5 py-6 flex items-start border-b-[1px] border-b-[#CECFD7]"
        >
          <div className="w-20 h-20 rounded-lg mr-10">
            <img
              src={product.photo ? product.photo : product.photos[0]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col md:flex-row items-start">
            <div className="mr-10">
              <p className="font-bold text-sm md:text-xl mb-3">
                {product.brand}
              </p>
              <p className="text-xs md:text-base mb-3 md:mb-0">
                {product.name}
              </p>
            </div>
            <div className="mr-10 flex flex-row md:flex-col items-start space-x-2 md:space-x-0">
              <p className="inline-block text-xs md:text-sm mb-3 text-[#6A6A6A] py-2 px-3 bg-[#F2F2F2] rounded-lg">
                {product.size}
              </p>
              <p className="inline-block text-xs md:text-sm text-[#6A6A6A] py-2 px-3 bg-[#F2F2F2] rounded-lg">
                {product.condition}
              </p>
            </div>
            <div className="mr-10">
              <p className="text-xs md:text-lg mb-3 text-[#8F8F8F]">
                ({product.weight} gr)
              </p>
              <p className="font-bold text-sm md:text-xl text-gogreen">
                Rp{product.price.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      ))}

      <div className="px-5 py-6">
        <h3 className="font-bold mb-2 text-sm md:text-base">
          Metode pengiriman
        </h3>
        <div className="flex justify-between">
          <div>
            <p className="mb-2 text-xs md:text-base leading-6">
              {detailCourier.name}{" "}
              <span className="px-[10px] py-1 bg-gogreen text-white rounded-full ml-0 md:ml-4">
                {selectedService}
              </span>
            </p>
            <p className="mb-2 text-xs md:text-base">
              {shippingCost?.etd} hari
            </p>
            <p className="text-xs md:text-sm">
              Pastikan metode pengiriman sudah sesuai kebutuhanmu
            </p>
          </div>

          <div className="flex flex-col items-end">
            <p
              className="mb-3 text-[#FD622A] font-medium cursor-pointer hover:underline"
              onClick={() => setIsCourierOpen((prev) => !prev)}
            >
              Ubah
            </p>
            <p className="font-bold text-xl text-gogreen">
              Rp{shippingCost?.value.toLocaleString("id-ID")}
            </p>
          </div>

          {isCourierOpen && (
            <ModalCourier
              isCourierOpen={isCourierOpen}
              setIsCourierOpen={setIsCourierOpen}
              setShippingCost={setShippingCost}
              setSelectedCourier={setSelectedCourier}
              setSelectedService={setSelectedService}
              item={item}
              selectedCourier={selectedCourier}
              selectedAlamat={selectedAlamat}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutProduct;
