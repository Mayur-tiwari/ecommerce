import React, { useEffect, useState } from 'react';
import "./Login.css";
import { BsEnvelope } from "react-icons/bs";
import { BiLockOpenAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../../Redux/actions/userAction';
import {useAlert} from "react-alert";

const Register = () => {
    const dispatch = useDispatch(); 
    const alert = useAlert();
    const navigate = useNavigate();

    const { isAuthenticated, error} = useSelector((state) => state.user);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
    })

    const {name, email, password} = user;
    
    const submitHandler= (e)=>{
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        dispatch(register(myForm));
       
    }
 
    const registerDataChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value})
    }


    useEffect(() => {
        if(error){
            alert.error(error);
        }
        if(isAuthenticated){
            navigate("/account");
        }
    }, [alert, error, isAuthenticated, navigate]);

    return (
        <div className='login-container'>
            <div className='login-main'>
                <form className='login-form' encType="multipart/form-data" onSubmit={submitHandler}>
                    <div className='login-heading'>
                        <h4>REGISTER</h4>
                    </div>
                    <div className='login-div'>
                        <BsPerson />
                        <input type='text' placeholder='UserName' required name='name' value={name} onChange={registerDataChange}/>
                    </div>
                    <div className='login-div'>
                        <BsEnvelope />
                        <input type='email' placeholder='Email' required name='email'  value={email} onChange={registerDataChange}/>
                    </div>
                    <div className='login-div'>
                        <BiLockOpenAlt />
                        <input type='password' placeholder='Password'  required name='password'  value={password} onChange={registerDataChange}/>
                    </div>    
                    <input type="submit" value="Register" className="loginBtn" />
                    <div className='login-div'>
                        <Link to="/login">Already Have an Account ?</Link>
                    </div>
                </form>
            </div>
        </div>
    )

}
export default Register;