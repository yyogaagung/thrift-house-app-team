import { InlineIcon } from "@iconify/react";
import { useState, useEffect } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import Accordion from "./Accordion";
import {
  accordionDataPria,
  accordionDataWanita,
  accordionDataAnak,
} from "../utils/accordionData";
import DropdownWeb from "./DropdownWeb";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { logout, userNotif } from "../action";
import Pusher from "pusher-js";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState("");
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState("");
  const [search, setSearch] = useState("");

  const {
    access_token: token,
    username,
    id,
  } = useSelector((state) => state.login);
  const { arrNotifId } = useSelector((state) => state.notif);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const { exp } = jwt_decode(token);
      if (exp < Date.now() / 1000) {
        dispatch(logout());
      }
    }
  }, [dispatch, token]);

  // Config Notifikasion
  useEffect(() => {
    const pusher = new Pusher("4dcb4449350727d8e46b", {
      cluster: "ap1",
      encrypted: true,
    });

    const channel = pusher.subscribe("thrifthouse");
    channel.bind(id, (newNotif) => {
      dispatch(userNotif(newNotif));
    });

    return () => {
      pusher.unsubscribe("thrifthouse");
    };
  }, [token]);

  const dropdownHandler = (e) => {
    setIsDropdownOpen((prev) =>
      prev === e.target.textContent ? "" : e.target.textContent
    );
  };

  const accordionHandler = (e) => {
    // console.log(e.target.textContent);
    setIsAccordionOpen((prev) =>
      prev === e.target.textContent ? "" : e.target.textContent
    );
  };

  const searchHandler = (e) => {
    e.preventDefault();
    navigate({
      pathname: "cari",
      search: createSearchParams({
        search: search,
      }).toString(),
    });
  };

  return (
    <div className="thisisnavbar text-oxford">
      <div className="thisistopnav bg-[#F2F2F2] text-[10px] sm:text-sm">
        <div className="customcontainer mx-auto py-3 px-6 lg:px-0 sm:flex sm:justify-between sm:items-center">
          <div className="flex justify-between items-center space-x-12 ">
            <a
              href="https://google.com"
              alt="download-thrifthouse"
              className="flex items-center"
            >
              <span>
                <InlineIcon
                  icon="fa:mobile"
                  height="20"
                  className="inline mr-2"
                />{" "}
              </span>
              <p>Download ThriftHouse App</p>
            </a>
            <a
              href="https://google.com"
              alt="thrifthouse-care"
              className="flex items-center"
            >
              <span>
                <InlineIcon
                  icon="ri:customer-service-fill"
                  height="20"
                  className="inline mr-2"
                />
              </span>
              <p>ThriftHouse Care</p>
            </a>
          </div>
          <div className="hidden sm:block">
            <a
              href={`${process.env.REACT_APP_SELLERURL}`}
              alt="jualan-di-thrifthouse"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jualan di ThriftHouse
            </a>
          </div>
        </div>
      </div>

      <div className="thisisbottomnav customcontainer mx-auto px-6 lg:px-0 py-4 flex items-center justify-between">
        <span
          className="w-6 h-6 inline lg:hidden mr-6"
          onClick={() => setIsHamburgerOpen((prev) => !prev)}
        >
          <InlineIcon icon="charm:menu-hamburger" height="24" />
        </span>
        <Link to="/" alt="thrifthouse" className="hidden lg:inline-block mr-6">
          <div className="w-[136px]">
            <img
              src="/images/thrifthouse.png"
              alt="thrifthouse"
              className="object-contain"
            />
          </div>
        </Link>

        <ul className="hidden lg:flex lg:items-center mr-6 space-x-8">
          <li
            className={`flex items-center cursor-pointer arrow ${
              isDropdownOpen === "Pria" ? "arrowreverse" : ""
            }`}
            onClick={(e) => dropdownHandler(e)}
          >
            Pria
          </li>
          {/* <InlineIcon
              icon="eva:arrow-ios-downward-outline"
              height="24"
              className="ml-1"
            /> */}
          <li
            className={`flex items-center cursor-pointer arrow ${
              isDropdownOpen === "Wanita" ? "arrowreverse" : ""
            }`}
            onClick={(e) => dropdownHandler(e)}
          >
            Wanita
          </li>
          <li
            className={`flex items-center cursor-pointer arrow whitespace-nowrap ${
              isDropdownOpen === "Anak-anak" ? "arrowreverse" : ""
            }`}
            onClick={(e) => dropdownHandler(e)}
          >
            Anak-anak
          </li>
        </ul>

        <div className="thisissearch border-[1px] border-[#CFCFCF] py-[10px] sm:py-[14px] px-[11px] sm:px-[21px] rounded-md flex items-center space-x-2 mr-6 grow">
          <span className="inline">
            <InlineIcon
              icon="akar-icons:search"
              color="#CFCFCF"
              height="24"
              className="w-5 h-5 sm:w-6 sm:h-6"
            />
          </span>
          <form onSubmit={(e) => searchHandler(e)} className="w-full">
            <input
              required
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Cari di ThriftHouse"
              className=" placeholder:text-[#CFCFCF] placeholder:text-sm sm:placeholder:text-base focus:outline-none w-full"
            />
          </form>
        </div>

        <div className="flex">
          <div className={`flex-1 mx-2 ${token ? "md:flex-1" : "md:hidden"}`}>
            <Link to="/keranjang">
              <InlineIcon
                icon="bxs:shopping-bag"
                height="32"
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </Link>
          </div>

          <div
            className={`flex-1 mx-2  ${
              token ? "hidden md:flex-1 md:block" : "md:hidden"
            }`}
          >
            <Link to="/favorit">
              <InlineIcon
                icon="ant-design:heart-filled"
                height="32"
                className="w-6 h-6 md:w-8 md:h-8"
              />
            </Link>
          </div>

          <div
            className={`flex-1 relative mx-2 ${
              token ? "md:flex-1" : "md:hidden hidden"
            }`}
          >
            <Link to="/account?action=Notifikasi">
              <InlineIcon
                icon="clarity:notification-solid"
                height="32"
                className="w-6 h-6 md:w-8 md:h-8"
              />
              <div className="absolute top-[-8px] right-[-5px] bg-[#4db680] w-5 text-center text-white rounded-full font-medium text-sm">
                <p className="">
                  {arrNotifId.length !== 0 ? arrNotifId.length : ""}
                </p>
              </div>
            </Link>
          </div>
        </div>

        {token ? (
          <div className="hidden lg:flex items-center ml-6">
            <div className="w-11 h-11 rounded-full bg-gogreen mr-3"></div>
            <Link to={`/account`}>
              <p>Hi, {username}</p>
            </Link>
          </div>
        ) : (
          <div className="hidden lg:block">
            <Link
              to="/login"
              className="py-[14px] px-[21px] border-[1px] border-gogreen text-gogreen rounded-lg mr-5"
            >
              Masuk
            </Link>
            <Link
              to="/register"
              className="py-[14px] px-[21px] border-[1px] bg-gogreen text-white rounded-lg"
            >
              Daftar
            </Link>
          </div>
        )}

        {/* icon lama, delete soon */}
        {/* <span className="w-6 h-6 mr-6 inline md:hidden">
          <InlineIcon icon="bxs:shopping-bag" height="24" />
        </span>
        <span className="w-6 h-6 inline md:hidden">
          <InlineIcon icon="ant-design:heart-filled" height="24" />
        </span> */}
      </div>

      <DropdownWeb isDropdownOpen={isDropdownOpen} />

      {/* dropdown mobile */}
      <div
        className={`navOverlay h-full ${
          isHamburgerOpen ? "w-full" : "w-[0%]"
        } bg-white fixed top-0 left-0 z-20 overflow-x-hidden`}
      >
        <div className="overlay-content">
          <div className="menu relative py-4 px-7 border-b-[1px] border-[#CFCFCF]">
            <span
              className="inline lg:hidden absolute"
              onClick={() => setIsHamburgerOpen((prev) => !prev)}
            >
              <InlineIcon icon="fa6-solid:arrow-left-long" height="20" />
            </span>
            <h3 className="font-bold text-sm text-center">Menu Utama</h3>
          </div>

          {token ? (
            <div className="py-5 px-6 flex items-center border-b-4 border-[#f2f2f2]">
              <div className="w-11 h-11 rounded-full bg-gogreen mr-3"></div>
              <Link
                to={`/account`}
                onClick={() => setIsHamburgerOpen((prev) => !prev)}
              >
                <p>Hi, {username}</p>
              </Link>
            </div>
          ) : (
            <div className="py-5 px-6 flex border-b-4 border-[#f2f2f2]">
              <Link
                to="/login"
                className="py-[10px] w-1/2 border-[1px] border-gogreen text-gogreen rounded-lg mr-5 text-center text-xs font-medium"
                onClick={() => setIsHamburgerOpen((prev) => !prev)}
              >
                Masuk
              </Link>
              <Link
                to="/register"
                className="py-[10px] w-1/2 px-[21px] border-[1px] bg-gogreen text-white rounded-lg text-center text-xs font-medium"
                onClick={() => setIsHamburgerOpen((prev) => !prev)}
              >
                Daftar
              </Link>
            </div>
          )}

          <ul className="flex items-center space-x-8 px-6 pt-6 justify-between">
            <li
              className={`flex items-center cursor-pointer arrow ${
                isAccordionOpen === "Pria" ? "arrowreverse" : ""
              }`}
              onClick={(e) => accordionHandler(e)}
            >
              Pria
            </li>

            <li
              className={`flex items-center cursor-pointer arrow ${
                isAccordionOpen === "Wanita" ? "arrowreverse" : ""
              }`}
              onClick={(e) => accordionHandler(e)}
            >
              Wanita
            </li>
            <li
              className={`flex items-center cursor-pointer arrow whitespace-nowrap ${
                isAccordionOpen === "Wanita" ? "arrowreverse" : ""
              }`}
              onClick={(e) => accordionHandler(e)}
            >
              Anak-anak
            </li>
          </ul>

          <div
            className={`accordion-pria px-6 mt-4 ${
              isAccordionOpen === "Pria" ? "block" : "hidden"
            }`}
          >
            {accordionDataPria.map(({ title, content }, index) => (
              <Accordion
                title={title}
                content={content}
                key={index}
                setIsHamburgerOpen={setIsHamburgerOpen}
              />
            ))}
          </div>
          <div
            className={`accordion-wanita px-6 mt-4 ${
              isAccordionOpen === "Wanita" ? "block" : "hidden"
            }`}
          >
            {accordionDataWanita.map(({ title, content }, index) => (
              <Accordion
                title={title}
                content={content}
                key={index}
                setIsHamburgerOpen={setIsHamburgerOpen}
              />
            ))}
          </div>
          <div
            className={`accordion-anak px-6 mt-4 ${
              isAccordionOpen === "Anak-anak" ? "block" : "hidden"
            }`}
          >
            {accordionDataAnak.map(({ title, content }, index) => (
              <Accordion
                title={title}
                content={content}
                key={index}
                setIsHamburgerOpen={setIsHamburgerOpen}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
