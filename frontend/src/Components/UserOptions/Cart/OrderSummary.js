import React, { useState } from 'react';
import {saveShippingInfo} from "../../../Redux/actions/cartAction";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Country, State} from "country-state-city";
import { Link } from 'react-router-dom';
import "./OrderSummary.css";
import {useAlert} from "react-alert";


const OrderSummary = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const {shippingInfo, cartItems} = useSelector((state) => state.cart);
  

  
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


const subtotal = cartItems.reduce(
    (acc,item) => acc + item.quantity * item.price, 0
)

const shippingCharges = subtotal > 1000 ? 0 : 200;

const tax = subtotal * 0.18;

const totalPrice = subtotal + tax + shippingCharges;


const proceedToPayment = (e) =>{
    e.preventDefault();
    
    if(phoneNo.length < 10 || phoneNo.length > 10){
        alert.error("Phone Number Should be 10 Digit Long");
        return;
    }
    dispatch(
        saveShippingInfo({address, city,state,country, pinCode, phoneNo})
    )

    const data = {
        subtotal,
        shippingCharges,
        tax,
        totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    alert.success("Order Placed Successfully");
    setTimeout(() => {

        navigate("/");
    }, 3000);
    
    clearTimeout();
}
  
  return (
    <div>
      <h2 className='shippingHeadingMain'>Order Summary</h2>
      <div className='shippingContainer'>
                <div className='shippingBox'>
                  <div>

                    <h2 className='shippingHeading'>Shipping Details</h2>
                    <form className='shippingForm' encType='multipart/form-data' >
                        <div>
                            <input type="text" placeholder='Address' required value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div>
                            <input
                                type='text' placeholder='City' required value={city} onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div>
                            <input type='number' placeholder='Pin Code' required value={pinCode} onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <input type="number" placeholder='Phone Number' required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)}
                            />
                        </div>
                        <div>
                            <select required value={country} onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Country</option>
                                {Country && Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>{item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {country && (
                          <div>
                                <select required value={state} onChange={(e) => setState(e.target.value)}>
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                          <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}
                        {/* <input type="submit" value="Continue" className='shippingBtn' disabled={state ? false : true} /> */}
                    </form>
                        </div>
                    <div className='confirmCartItems'>
                        <h2 className='shippingHeading'>Your Cart Items:</h2>
                        <div className='confirmCartItemsContainer'>
                            {cartItems && cartItems.map((item) => (
                                <div key={item.id}>
                                    <img src={item.images} alt="Product" />
                                    <Link to={`/product/${item.id}`}>{item.name}</Link>
                                    <span>
                                        {item.quantity} X ₹{item.price} =
                                        <b>₹{item.price * item.quantity}</b> 
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div><div>
                    <div className="orderSummary">
                        <h2 className='paymentSummaryHeading'>Payment Summary</h2>
                        <div>
                            <div>
                                <p>Subtotal:</p>
                                <span>₹{subtotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>
                        <div className='orderSummaryTotal'>
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>
                        <button onClick={proceedToPayment}>Proceed To Payment</button>
                    </div>
                </div>
            </div>
            </div>
  )
}

export default OrderSummary;