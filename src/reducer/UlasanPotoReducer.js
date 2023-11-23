const initialState = {
    modalPhoto:false,
}

const ModalPotoReducer = (state = initialState, action) => {
    switch(action.type){
        case 'IS-DISPLAY-MODALPOTO':
            return {
                    ...state,
                    modalPhoto:action.payload,
                }
        default:
            return state;
    }
}

export default ModalPotoReducer;