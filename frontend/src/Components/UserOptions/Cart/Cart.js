import React from 'react';
import "./Cart.css";
import CartItemCard from './CartItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart, removeItemsFromCart } from '../../../Redux/actions/cartAction';
import { Link, useNavigate } from 'react-router-dom';
import { RemoveShoppingCart } from '@material-ui/icons';
import {Typography} from "@material-ui/core";

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);


  const increaseQuantity = (id, quantity) => {
    const newQty = quantity + 1;
    dispatch(addItemsToCart(id, newQty));
  }

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  }

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  }

  const checkOutHandler = () => {
    navigate("/ordersummary");
  }

  return (
    <>
      {cartItems.length === 0 ? (
          <div className='emptyCart'>
                <RemoveShoppingCart/>
                <Typography>Your Cart is Empty</Typography> 
                <Link to="/products">View Product</Link>
            </div>
      ) : (
        <>
          <div className='cart-main'>
            <div className='cart-container-left'>
              <div className='cart-heading'>
                <h3>Shopping Cart</h3>
                <h4>{cartItems.length} Items</h4>
              </div>
              <div>
                <div className='cart-product'>
                  <div className='cart-details'>Product Details</div>
                  <div>Price</div>
                  <div>Quantity</div>
                  <div>Total</div>
                </div>
                <div>

                  {cartItems && cartItems.map((item) => (
                    <div key={item.id} className='card'>
                      <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                      <div className="cartInput">
                        <button className='button'
                          onClick={() => decreaseQuantity(item.id, item.quantity)}
                        >-</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button className='button'
                          onClick={() => increaseQuantity(item.id, item.quantity)}
                        >+</button>
                      </div>
                      <p className='cartSubtotal-para'>Subtotal:- </p>
                      <p className="cartSubtotal">{`₹${(item.price * item.quantity).toFixed(2)}`}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='cart-container-right'>
              <div className='orderSummary-div'>
                <h3>Order Summary</h3>
              </div>
              <div className='totalItem-div'>
                <p>Total Items</p>
                <span>{cartItems.length}</span>
              </div>
              <div className='totalCost-div'>
                <p>Total Cost</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price, 0
                )}`}</p>
              </div>
              <button onClick={checkOutHandler} className='checkout-btn'>Checkout</button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default Cart; 