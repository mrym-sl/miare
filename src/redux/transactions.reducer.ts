import React from 'react';
import { combineReducers } from "redux";

export const TransactionReducer = (state={} , action) => {
    switch (action.type) {
        case 'INITIAL_TRANSACTIONS' :
            return action.payload;
        default:
            return state;    
    }
}

export const reducer = combineReducers({
    transaction : TransactionReducer
})
// export default persistReducer(persistConfig, reducer);