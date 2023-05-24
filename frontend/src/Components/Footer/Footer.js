import React from 'react'
import { BsFillSendFill } from "react-icons/bs";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import "./Footer.css";
import { Link } from 'react-router-dom';
import playStore from "../../images/playstore.png";
import appStore from "../../images/Appstore.png";

const Footer = () => {
    return (
        <div className='footer-container'>
            <div className='footer-up'>
                <h2>Start Using Ecommerce Today.</h2>
                <div>
                    <BsFillSendFill />  
                    <input type='email' placeholder='Your Email' />
                </div>
            </div>
            <div className='footer-down'>
                <div className='footer-logo'>
                    <h4>DOWNLOAD OUR APP</h4>
                    <p>Download App For Android and IOS Mobile</p>
                    <img src={playStore} alt='playstore' />
                    <img src={appStore} alt="appstore" />
                </div>
                <div className='footer-mid-right'>
                    <Link to="/about">About</Link>
                    <Link to="/contact">Contact</Link>
                </div>
                <div className='footer-tc'>
                    <Link>Terms and Conditions</Link>
                    <Link>Privacy Policy</Link>
                    <Link>Cookie Policy</Link>
                </div>
                <div className='footer-right'>
                    <h3>Let's Connect</h3>
                    <h5>ecommerce.app</h5>
                    <div className='footer-socialmedia'>
                        <span><AiFillFacebook /></span>
                        <span><AiFillTwitterSquare /></span>
                        <span><AiFillLinkedin /></span>
                        <span><AiFillInstagram /></span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer;