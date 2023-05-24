import React, { useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import "./Dashboard.css";
import { MdOutlinePendingActions, MdPeopleOutline } from "react-icons/md";
import { BsTruck, BsCheckCircle, BsCart4 } from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../../Redux/actions/productAction";
import {allUsers} from "../../../Redux/actions/userAction";
import {useNavigate} from "react-router-dom";


const Dashboard = () => {
  const dispatch = useDispatch();

  const {products} = useSelector((state) => state.allProducts);
  const {users} = useSelector((state) => state.allUsers);
  const navigate = useNavigate();
  


  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(allUsers());
  },[dispatch]);

  const allProductsHandler = () => {
    navigate("/admin/products"); 
  }

  return (
    <div className="dashboard">
      <Sidebar />
      <div className='dashboard-main'>
        <div className='details-div order-complete'>
          <div>
            <p>Orders Completed</p>
            <h3>10</h3>
            <button>View All</button>
          </div>
          <div>
            <BsCheckCircle/>
          </div>
        </div>

        <div className='details-div order-processing'>
          <div>
            <p>Orders Processing</p>
            <h3>7</h3>
            <button>View All</button>
          </div>
          <div>
            <BsTruck/>
          </div>
        </div>

        <div className='details-div order-pending'>
          <div>
            <p>Orders Pending</p>
            <h3>2</h3>
            <button>View All</button>
          </div>
          <div>
            <MdOutlinePendingActions/>
          </div>
        </div>

        <div className='details-div total-users'>
          <div>
            <p>All Users</p>
            <h3>{users.length}</h3>
            <button>View All</button>
          </div>
          <div>
            <MdPeopleOutline/>
          </div>
        </div>

        {products && <div className='details-div total-products'>
          <div>
            <p>All Products</p>
            <h3>{products.length}</h3>
            <button onClick={allProductsHandler}>View All</button>
          </div>
          <div>
            <BsCart4/>
          </div>
        </div>}

      </div>
    </div>

  )
}

export default Dashboard;