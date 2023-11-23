const initialState = {
    arrNotifId : []
};

export default function notifReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case "notif/add":
      return {
        ...state,
        arrNotifId : [...state.arrNotifId, payload]
      };
    case "notif/destroy":
      return { arrNotifId: [] };
    default:
      return state;
  }
}
