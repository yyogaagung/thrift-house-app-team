const initialState = {
    isDisplayModal:false,
    idOrderUlasan:""
}

const modalUlasanReducer = (state = initialState, action) => {
    switch(action.type){
        case 'set-modal-ulasan':
            return {
                    ...state,
                    isDisplayModal:action.payload.modal,
                    idOrderUlasan:action.payload.id

                }
        default:
            return state;
    }
}

export default modalUlasanReducer;