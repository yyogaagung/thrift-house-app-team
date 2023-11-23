const initialState = { value: [] };

const favReducer = (state = initialState, action) => {
  switch (action.type) {
    case "fav/get":
      return { ...state, value: action.payload };
    case "fav/add":
      if (state.value.includes(action.payload)) {
        const newArr = state.value.filter((e) => e !== action.payload);
        return { ...state, value: newArr };
      }
      return { ...state, value: [...state.value, action.payload] };
    default:
      return state;
  }
};

export default favReducer;
