import axios from "axios"
import {ActionTypes, SAVE_SHIPPING_INFO} from "../constants/cartConstant";

export const addItemsToCart = (id , quantity) => async (dispatch,getState) => {
    const {data} = await axios.get(`/api/v1/product/${id}`);
    console.log(data);

    dispatch({type: ActionTypes.ADD_TO_CART,
        payload:{
            id,
            images: data.product.images[0].url,
            name: data.product.name,
            price: data.product.price,
            quantity,
        },
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))

}

export const removeItemsFromCart = (id) => async(dispatch, getState) =>{
    dispatch({type: ActionTypes.REMOVE_CART_ITEM,
        payload: id
        }
    );

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems)) 
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });

    localStorage.setItem("shippingInfo", JSON.stringify(data));
}