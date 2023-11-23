import axios from "axios";

const isDisplayModalFunc = (payload) => {
  return {
    type: "IS-DISPLAY-MODAL",
    payload,
  };
};
const displayModalTransaksi = (payload) => {
  return {
    type: "set-modal-transaksi",
    payload,
  };
};
const displayModalUlasan= (payload) => {
  return {
    type: "set-modal-ulasan",
    payload,
  };
};

const loginSuccessAction = (payload) => ({
  type: "login/success",
  payload,
});

const userNotif = (payload) => ({
  type: "notif/add",
  payload,
});
const userDestroyNotif = () => ({
  type: "notif/destroy",
});
;
const logout = () => ({
  type: "user/logout",
});

const isModalPotoUlasanFunc = (payload) => {
  return {
    type: "IS-DISPLAY-MODALPOTO",
    payload,
  };
};

const favAction = (userId) => (dispatch) => {
  axios
    .get(
      `https://thrifthouse.herokuapp.com/api/v1/users/${userId}/products/favorites?size=999`
    )
    .then((res) => {
      const payload = res.data.data.products.map((e) => e.id);
      dispatch(favGet(payload));
    })
    .catch((err) => console.log(err));
};

const favGet = (payload) => ({
  type: "fav/get",
  payload,
});

const favAdd = (payload) => ({
  type: "fav/add",
  payload,
});

const checkoutAdd = (payload) => ({
  type: "checkout/add",
  payload,
});

const checkoutDelete = (payload) => ({
  type: "checkout/delete",
});

const setTabProfile = (payload) => ({
  type: "settab/profile",
  payload
});
const setSubTabProfile = (payload) => ({
  type: "setsubtab/profile",
  payload
});

const isModalLoginFunc = (payload) => {
  return {
    type: "IS-DISPLAY-MODALLOGIN",
    payload,
  };
};

export {
  isDisplayModalFunc,
  loginSuccessAction,
  logout,
  isModalPotoUlasanFunc,
  favAction,
  favAdd,
  checkoutAdd,
  checkoutDelete,
  isModalLoginFunc,
  userNotif,
  userDestroyNotif,
  setTabProfile,
  setSubTabProfile,
  displayModalTransaksi,
  displayModalUlasan
};
