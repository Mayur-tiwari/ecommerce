import React from 'react';
import "./ContactUs.css";
import { IoIosCall, IoIosMail } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa";
import { RiFacebookLine, RiInstagramLine, RiLinkedinLine, RiTwitterLine } from "react-icons/ri";

const ContactUs = () => {
    return (
        <div className='contact-main'>
            <h1 className='contact-heading'>Contact Us</h1>
            <p className='contact-para'>Any question or remarks? Just write us a message!</p>
            <div className='contact-container'>
                <div className='contact-left'>
                    <h3 className='contact-left-heading'>Contact Information</h3>
                    <p className='contact-left-para'>Fill us the form and our Team will get back to you within 24 hours</p>
                    <div>
                        <IoIosCall />
                        <p>9109330696</p>
                    </div>
                    <div>
                        <IoIosMail />
                        ecommerce@gmail.com
                    </div>
                    <div>
                        <FaAddressCard />
                        Vijay Nagar, Indore
                    </div>
                    <div>
                        <RiFacebookLine />
                        <RiTwitterLine />
                        <RiInstagramLine />
                        <RiLinkedinLine />
                    </div>
                </div>
                <div className='contact-right'>
                    <form className='contact-form'>
                        <div className='contact-form-div'>
                            <div>
                                <p>First Name</p>
                                <input type='text' />
                            </div>
                            <div>
                                <p>Last Name</p>
                                <input type='text' />
                            </div>
                        </div>
                        <div className='contact-form-div'>
                            <div>
                                <p>Mail</p>
                                <input type='email' />
                            </div>
                            <div>
                                <p>Phone</p>
                                <input type='number' />
                            </div>
                        </div>
                        <div className='contact-form-div'>
                            <div>
                                <p>Message</p>
                                <input type='text' placeholder='Write your message'/>
                            </div>
                        </div>
                        <button className='contact-btn'>Send Message</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactUs;