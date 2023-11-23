import { useEffect, useState } from "react";
import { useDispatch,  useSelector} from "react-redux";
import { Icon } from "@iconify/react";
import { isModalPotoUlasanFunc } from "../../action";
import ModalPhoto from "./ModalPhoto";

const UlasanCard = ({username, date, desc, photos, rating}) => {
    const [isLiked, setIsLike] = useState(false);
    // const [countLike, setCountLike] = useState(0);
    const star =[]
    const dispatch = useDispatch();
    const [pilihPoto, setPilihPoto] = useState("");
    const { modalPhoto } = useSelector((state) => state.isModalPotoUlasan);

    function makeArr(params) {
        for(let i =0; i < params; i++){
            star[i]=i
        }
        
    }

    useEffect(()=>{

    },[pilihPoto])

    makeArr(rating)
    const likeHandler = () => {
        setIsLike((prev) => !prev);
      };

      function showHiddenModal(e){
        e.preventDefault();
        dispatch(isModalPotoUlasanFunc(true))
    }

        
    return (
        <div className="customcontainer  mx-auto p-7 mb-10 relative shadow-sm shadow-black-rgba">
            <div className="w-full  flex justify-between p-5 ">
                <div>
                    <p className="text-base font-semibold text-gogreen">{username}</p>
                    <p className="text-sm font-light text-slate-500">{date}</p>
                </div>
                <div className="w-12 flex justify-around items-center">
                {isLiked ?(
                    <p className="text-slate-400 flex justify-center items-center">1</p>
                ) : (
                    <p className="text-slate-400 flex justify-center items-center">0</p>
                )}
               
                <div onClick={likeHandler}>
                {isLiked ? (
                    <Icon
                    icon="ant-design:like-filled"
                    height="24"
                    className="text-amber-400"
                    
                    />
                ):
                (
                    <Icon
                    icon="ant-design:like-filled"
                    height="24"
                    className="text-gray-400"
                    />
                )
                }
                </div>
                </div>
            </div>
                
            <div  className="w-full ">
            <ul className=" w-32 ml-4 flex">
                {star.map((el, index) => (
                    <li key={index}>
                        <Icon
                            icon="ant-design:star-filled"
                            height="24"
                            className="text-yellow-400"
                        />
                    </li>
                ))}
            </ul>
            <p className="font-normal text-gray-700 mt-2 ml-4 flex justify-start items-center">{desc}</p>
            <div className="p-5">
                <ul className="flex justify-evenly w-56">
                {photos.map((el, index) => (
                    <li key={index} onClick={showHiddenModal} className="w-16 h-16 mr-1">
                        <img
                            className="w-full"
                            onClick={() => {setPilihPoto(el)} }
                            src={el}
                            alt="ulasan"
                        />
                    </li>
                ))}
                    
                   
                </ul>
            </div>
            </div>
            {modalPhoto && <ModalPhoto pilihPoto={pilihPoto}/>}
        </div>
            
    );
};

export default UlasanCard;