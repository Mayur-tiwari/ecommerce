import { 
  ALL_PRODUCT_FAIL, 
  ALL_PRODUCT_REQUEST, 
  ALL_PRODUCT_SUCCESS,
  FEATURED_PRODUCT_REQUEST,
  FEATURED_PRODUCT_SUCCESS,
  FEATURED_PRODUCT_FAIL,  
  SINGLE_PRODUCT_REQUEST,
  SINGLE_PRODUCT_SUCCESS,
  SINGLE_PRODUCT_FAIL,
  CREATE_PRODUCT_REQUEST,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_RESET,
  CREATE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  DELETE_PRODUCT_FAIL,
} from "../constants/productConstants";


export const allProductsReducer = (state = {products: []}, action) => {
  switch(action.type){
    case ALL_PRODUCT_REQUEST: 
    return{
      loading: true,
      product: []
    }
    case ALL_PRODUCT_SUCCESS:
      return {
        loading: false,
        products : action.payload.products,
      }
      case ALL_PRODUCT_FAIL:
        return{
          loading: false,
          payload: action.payload
        }
      default:
        return state;
  }
}

export const FeaturedProductReducer = (state = {products: []}, action) => {
  switch (action.type) {
    case FEATURED_PRODUCT_REQUEST:
      return { 
        loading: true,
        product: []
       };
     case FEATURED_PRODUCT_SUCCESS:
      return {
        loading: false,
        products : action.payload.products,
      }  
      case FEATURED_PRODUCT_FAIL:
        return{
          loading: false,
          payload: action.payload
        }
    default:
      return state;
  }
};

export const selectedProductsReducer = (state = {product: {}}, action) => {
  switch (action.type){
    case SINGLE_PRODUCT_REQUEST:
      return{
        loading: true,
        ...state,
      }
      case SINGLE_PRODUCT_SUCCESS:
          return {
            loading: false,
              product: action.payload,
          }
          case SINGLE_PRODUCT_FAIL:
            return{
              loading: false,
              error: action.payload
            }
      default: 
      return state;
  }
}

export const productReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case DELETE_PRODUCT_SUCCESS:
      return{
        ...state,
        loading: false,
        isDeleted: action.payload,
      }
    case DELETE_PRODUCT_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    case DELETE_PRODUCT_RESET:
      return{
        ...state,
        isDeleted: false,
      }
  
    default:
      return state;
  }
}

export const newProductReducer = (state = {product: {}}, action) => {
  switch (action.type){
    case CREATE_PRODUCT_REQUEST:
      return{
        ...state,
        loading: true,
      }
    case CREATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        product: action.payload.product
      }
    case CREATE_PRODUCT_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload
      }
    case CREATE_PRODUCT_RESET:
      return {
        ...state,
        success: true,
      }
    default:
      return state;
  }
}