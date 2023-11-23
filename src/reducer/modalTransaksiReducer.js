const initialState = {
    isDisplay:false,
    idOrder:""
}

const modalTransaksiReducer = (state = initialState, action) => {
    switch(action.type){
        case 'set-modal-transaksi':
            return {
                    ...state,
                    isDisplay:action.payload.modal,
                    idOrder:action.payload.id
                }
        default:
            return state;
    }
}

export default modalTransaksiReducer;