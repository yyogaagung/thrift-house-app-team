import { Icon } from "@iconify/react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { favAdd } from "../action";
import { useNavigate } from "react-router-dom";

const ProductCard = ({
  id,
  name,
  brand,
  size,
  condition,
  price,
  photos,
  category,
}) => {
  const favFlag = useSelector((state) => state.fav.value);
  const [isFavClicked, setIsFavClicked] = useState(false);
  const { id: userId } = useSelector((state) => state.login);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    setIsFavClicked(favFlag.includes(id));
  }, [favFlag, id]);

  const favHandler = () => {
    if (userId) {
      axios
        .post(
          `https://thrifthouse.herokuapp.com:443/api/v1/users/${userId}/products/favorites`,
          { productId: id }
        )
        .then((res) => {
          dispatch(favAdd(res.data.data.productId));
          setIsFavClicked((prev) => !prev);
        })
        .catch((err) => console.log(err));
    } else {
      navigate("/login", { replace: true });
    }
  };

  return (
    <div className="relative inline-block w-full max-w-[270px]">
      <Link to={`/${category}/${id}`}>
        <div className="flex flex-col rounded-lg shadow-lg">
          <div className="h-[114px] lg:h-[232px] rounded-t-lg">
            <img
              src={photos}
              alt="burger"
              className="w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="px-4 py-3">
            <h4 className="font-bold text-sm lg:text-xl mb-1 truncate">
              {brand}
            </h4>
            <h5 className="font-medium text-xs lg:text-xl mb-1 truncate">
              {name}
            </h5>
            <div className="flex text-[8px] space-x-1 mb-2">
              <div className="py-[2px] px-2 bg-[#F2F2F2] rounded text-[#8F8F8F]">
                {condition}
              </div>
              <div className="py-[2px] px-2 bg-[#F2F2F2] rounded text-[#8F8F8F]">
                {size}
              </div>
            </div>
            <h5 className="text-gogreen font-medium text-sm lg:text-xl">
              Rp{price.toLocaleString("id-ID")}
            </h5>
          </div>
        </div>
      </Link>

      <div
        className="absolute z-10 right-2 top-2 sm:right-3 sm:top-3 bg-white p-1 rounded-full cursor-pointer"
        onClick={favHandler}
      >
        {isFavClicked ? (
          <Icon
            icon="ant-design:heart-filled"
            height="24"
            className="text-red-600"
          />
        ) : (
          <Icon
            icon="ant-design:heart-outlined"
            height="24"
            className="text-[#6B7280]"
          />
        )}
      </div>
    </div>
  );
};

export default ProductCard;
