import React, { useEffect, useState } from 'react';
import "./Login.css";
import { BsEnvelope } from "react-icons/bs";
import { BiLockOpenAlt } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import {useAlert} from "react-alert";
import {useDispatch, useSelector} from "react-redux";
import {login, clearErrors} from "../../Redux/actions/userAction";
import Loading from '../Loader/Loading';

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const alert = useAlert();

    const {error, loading, isAuthenticated} = useSelector((state) => state.user)

    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");


    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login(userEmail, userPassword));
    }
    
    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isAuthenticated){
            navigate("/");
        }
    },[alert, dispatch, error, isAuthenticated, navigate])
  
    return (
        <>
        {loading ? <Loading/> : <><div className='login-container'>
            <div className='login-main'>
                <form className='login-form' onSubmit={loginSubmit}>
                    <div className='login-heading'>
                        <h4>LOGIN</h4>
                    </div>
                    <div className='login-div'>
                        <BsEnvelope />
                        <input type='text' placeholder='Email' required value={userEmail} onChange={(e) => setUserEmail(e.target.value)}/>
                    </div>
                    <div className='login-div'>
                        <BiLockOpenAlt />
                        <input type='password' placeholder='Password' required value={userPassword} onChange={(e) => setUserPassword(e.target.value)}/>
                    </div>
                    <div className='login-div'>
                        <p>Forgot Password ?</p>
                    </div>
                    <input type="submit" value="Login" className="loginBtn" />
                    <div className='login-div'>
                        <Link to="/register">Create Account</Link>
                    </div>
                </form>
            </div>
        </div></>}
        </>
    )
}

export default Login;