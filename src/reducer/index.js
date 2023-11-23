import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import modalLoginReducer from "./modalLoginReducer";
import modalReducer from "./modalReducer";
import ModalPotoReducer from "./UlasanPotoReducer";
import favReducer from "./favReducer";
import checkoutReducer from "./checkoutReducer";
import notifReducer from "./notifReducer";
import tabProfileReducer from "./tabProfile";
import subtabProfileReducer from "./subTab";
import modalTransaksiReducer from "./modalTransaksiReducer";
import modalUlasanReducer from "./ModalUlasan";

const allReducer = combineReducers({
  isModalDisplay: modalReducer,
  login: loginReducer,
  notif: notifReducer,
  isModalPotoUlasan: ModalPotoReducer,
  fav: favReducer,
  checkout: checkoutReducer,
  isModalLogin: modalLoginReducer,
  tabProfile : tabProfileReducer,
  subTab : subtabProfileReducer,
  isModalTransaksi : modalTransaksiReducer,
  isModalUlasan : modalUlasanReducer
});

export default allReducer;
