const initialState = {
    display:false,
}

const modalLoginReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IS-DISPLAY-MODALLOGIN':
            return {
                    ...state,
                    display:action.payload
                }
        default:
            return state;
    }
}

export default modalLoginReducer;