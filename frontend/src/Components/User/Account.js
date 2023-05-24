import React from 'react';
import "./Account.css";
import { useSelector } from "react-redux";
import moment from "moment";
import profile from "../../images/Profile.png";

const Account = () => {

    const { user } = useSelector((state) => state.user);

    return (<>
        {user && (
            <div>

                <h1 className='account-heading'>My Account</h1>
                <div className='account-main'>
                    <div className='account-image'>
                        <img src={profile} alt='avatar' />
                        <h3>{user.name}</h3>
                    </div>
                    <div className='account-details'>
                        <div className='account-name'>
                            <h2>Name</h2>
                            <input type='text' name='name' readOnly value={user.name} />
                        </div>
                        <div className='account-email'>
                            <h2>Email</h2>
                            <input type='text' name='name' readOnly value={user.email} />
                        </div>
                        <div className='account-date'>
                            <h2>Account Created</h2>
                            <input type='text' name='name' readOnly value={moment(user.createdAt).utc().format('YYYY-MM-DD')} />
                        </div>
                        <div className='account-edit'>
                            <button>Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    )
}

export default Account;