const initValues  = {
    ID: null, 
    accountType: null
}

const accountReducer = (state = initValues, action) =>{
    switch(action.type){
        case 'SET_ACCOUNT_ID': {
            state = {...state, ID: action.ID};
            break;
        }
        case 'SET_TYPE': {
            state =  {...state, accountType: action.accountType};
            break;
        }
    }
    return state;
}

export default accountReducer;