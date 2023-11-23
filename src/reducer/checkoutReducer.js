const initialState = { value: [] };

const checkoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case "checkout/add":
      return { ...state, value: action.payload };
    case "checkout/delete":
      return { ...state, value: [] };
    default:
      return state;
  }
};

export default checkoutReducer;
