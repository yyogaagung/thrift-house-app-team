const initialState = {
    display:"Akun Saya",
}

const tabProfileReducer = (state = initialState, action) => {
    switch(action.type){
        case "settab/profile":
            return {
                    ...state,
                    display:action.payload
                }
        default:
            return state;
    }
}

export default tabProfileReducer;