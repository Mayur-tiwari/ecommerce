import {ActionTypes, SAVE_SHIPPING_INFO} from "../constants/cartConstant";


export const cartReducer = (state = {cartItems: [], shippingInfo:{} }, action) => {
    switch (action.type) {
        case ActionTypes.ADD_TO_CART:
            const item = action.payload

            const isItemExist = state.cartItems.find(
                (i) => i.id === item.id
            );

            if(isItemExist){
                return{
                    ...state,
                    cartItems: state.cartItems.map((i) => 
                    i.id === isItemExist.id ? item : i
                    )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        case ActionTypes.REMOVE_CART_ITEM:
            return{
                ...state,
                cartItems: state.cartItems.filter((i) => i.id !== action.payload),
            }
        case SAVE_SHIPPING_INFO:
            return{
                ...state,
                shippingInfo: action.payload,
            }
        default:
            return state;
    }
}