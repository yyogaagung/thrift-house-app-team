const initialState = {
  access_token: "",
};

export default function loginReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "login/success":
      return {
        ...state,
        ...payload,
      };

    case "user/logout":
      return {
        access_token: "",
      };
    default:
      return state;
  }
}
