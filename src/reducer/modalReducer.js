const initialState = {
    display:false,
}

const modalReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IS-DISPLAY-MODAL':
            return {
                    ...state,
                    display:action.payload
                }
        default:
            return state;
    }
}

export default modalReducer;