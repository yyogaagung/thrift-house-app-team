const initialState = {
    display:"Belum Bayar",
}

const subtabProfileReducer = (state = initialState, action) => {
    switch(action.type){
        case 'setsubtab/profile':
            return{
                display:action.payload
            }
        default:
            return state;
    }
}

export default subtabProfileReducer;