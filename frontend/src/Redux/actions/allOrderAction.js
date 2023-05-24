import {ActionTypes} from "../constants/allOrderConstant";

export const getAllOrders = (allOrders) => {
    return{
        type: ActionTypes.GET_ALL_ORDERS,
        payload: allOrders
    }
} 