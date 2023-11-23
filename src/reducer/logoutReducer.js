const user = JSON.parse(localStorage.getItem("persist:root"));

const initialState = user

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case "user/logout":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}