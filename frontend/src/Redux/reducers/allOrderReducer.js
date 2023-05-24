import {ActionTypes} from "../constants/allOrderConstant";

const initialState = {
    allOrders:[],
}

export const allOrderReducer = (state = initialState, {type, payload}) => {
    switch(type){
        case ActionTypes.GET_ALL_ORDERS:
            return {...state, allOrders: payload};
        default:
            return state;
    }
}