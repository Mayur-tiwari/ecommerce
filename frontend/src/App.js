import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"; 
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import Home from './Components/Home/Home';  
import ProductDetails from './Components/Product/ProductDetails'; 
import Products from './Components/Products/Products';
import Login from './Components/User/Login';
import Register from './Components/User/Register';
import UserOptions from "./Components/UserOptions/UserOptions";
import Cart from './Components/UserOptions/Cart/Cart';
import ContactUs from './Components/ContactUs/ContactUs';
import AboutUs from './Components/AboutUs/AboutUs';
import Laptops from './Components/Products/Laptops';
import Watches from './Components/Products/Watches';
import Accessories from './Components/Products/Accessories';
import Mobiles from './Components/Products/Mobiles';
import { useSelector } from 'react-redux';
import store from "./store";
import { useEffect } from 'react';
import { loadUser } from './Redux/actions/userAction';
import Dashboard from './Components/Admin/Dashboard/Dashboard';
import AllProducts from './Components/Admin/Products/AllProducts';
import CreateProduct from "./Components/Admin/Products/CreateProduct";
import AllOrders from "./Components/Admin/Orders/AllOrders";
import AllUsers from "./Components/Admin/Users/AllUsers";
import Reviews from "./Components/Admin/Reviews/Reviews";
import Account from "./Components/User/Account";
import OrderSummary from './Components/UserOptions/Cart/OrderSummary';
import Orders from './Components/User/Orders';


function App() {

  const { isAuthenticated, user } = useSelector((state) => state.user)

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
    <BrowserRouter>
    <Header />
    {isAuthenticated &&  <UserOptions user={user}/>}
 
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/products' element={<Products/>}/>
      <Route exact path='/product/:productId' element={<ProductDetails/>}/>  
      <Route path='/products/mobiles' element={<Mobiles/>}/>
      <Route path='/products/laptops' element={<Laptops/>}/>
      <Route path='/products/watches' element={<Watches/>}/>
      <Route path='/products/accessories' element={<Accessories/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/register' element={<Register/>}/>
      <Route exact path='/cart' element={<Cart/>}/>
      <Route excat path="/contact" element={<ContactUs/>}/>
      <Route exact path='/about' element={<AboutUs/>}/>
      <Route exact path='/admin/dashboard' element={<Dashboard/>} />
      <Route exact path="/admin/products" element={<AllProducts/>}/>
      <Route exact path="admin/product" element={<CreateProduct/>}/>
      <Route exact path="/admin/orders" element={<AllOrders/>}/>
      <Route exact path="/admin/users" element={<AllUsers/>}/>
      <Route exact path="/admin/reviews" element={<Reviews/>}/>
      <Route exact path="/account" element={<Account/>}/>
      <Route exact path='/ordersummary' element={<OrderSummary/>}/> 
      <Route exact path="/orders" element={<Orders/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
