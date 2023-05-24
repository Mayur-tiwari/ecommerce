import React, { useEffect, useState } from 'react';
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeSelectedProduct, selectedProduct } from "../../Redux/actions/productAction"
import { useAlert } from "react-alert";
import { addItemsToCart } from "../../Redux/actions/cartAction";
import Loading from '../Loader/Loading';

const ProductDetails = () => {

  const { loading } = useSelector((state) => state.product);
  const { product } = useSelector((state) => state.product.product);
  const { productId } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();

  const [quantity, setQuantity] = useState(1);

  const onIncrementHandler = () => {
    setQuantity(quantity + 1);
  }

  const onDecrementHandler = () => {
    if (quantity === 1) return;

    setQuantity(quantity - 1);
  }

  useEffect(() => {
    dispatch(selectedProduct(productId));

    return () => {
      dispatch(removeSelectedProduct());
    }
  }, [dispatch, productId])

  const addToCartHandler = () => {
    dispatch(addItemsToCart(productId, quantity));
    alert.success("Product Successfully added to cart");
  }

  return (<>
    {loading ? <Loading /> : <> {product && (
      <div className='productDetails-main'>
        <div className='productDetails-container'>
          <div className='productDetails-image'>
            <img src={product.images[0].url} alt={product._id} />
          </div>
          <div className='productDetails-detail'>
            <div>
              <p>Category :- </p>
              <h4>{product.subCategory}</h4>
            </div>
            <div>
              <h1>{product.name}</h1>
            </div>
            <div>
              <h4>Product Id :- </h4>
              <p>{product._id}</p>
            </div>
            <div>
              <h1>₹ {product.price}</h1>
            </div>
            <div>
              <button onClick={onDecrementHandler} className='incDec-btn'>-</button>
              <span>{quantity}</span>
              <button onClick={onIncrementHandler} className='incDec-btn'>+</button>
            </div>
            <div>
              <h4>Description:- </h4>
              <p>{product.description}</p>
            </div>
            <div>
              <button className='productDetails-btn' onClick={addToCartHandler}>Add To Cart</button>
            </div>
          </div>
        </div>
      </ div>
    )}
    </>
    }
  </>

  )
}

export default ProductDetails;