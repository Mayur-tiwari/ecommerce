import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../Redux/actions/productAction";
import { Link } from "react-router-dom";
import "./Products.css";
import Loading from "../Loader/Loading";


const Products = () => {

    const dispatch = useDispatch();
   
    const {products, loading} = useSelector((state) => state.allProducts);
  

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
  
    return (
        <>
            <div>
                <nav className='products-navbar'>
                    <Link to={"/products"}>All Products</Link>
                    <Link to={"/products/mobiles"}>Mobiles</Link>
                    <Link to={"/products/laptops"}>Laptops</Link>
                    <Link to={"/products/watches"}>Watches</Link>
                    <Link to={"/products/accessories"}>Accessories</Link>
                </nav>
            </div>
            {loading ? <Loading/> : 
            <>
            {products && products.map((item, index) => (
                <div className='products-main' key={index}> 
                            <Link to={`/product/${item._id}`}>
                                 <div className='products-container'>
                                     <div className='products-image'>
                                         <img src={item.images[0].url} alt={index} /> 
                                     </div>
                                     <div className='products-description'>
                                         <h3>{item.name}</h3>
                                         <h4>Product Description</h4>
                                         <p>{item.description}</p>
                                     </div>
                                     <div className='products-amount'> 
                                         <h2>₹ {item.price}</h2> 
                                     </div>
                                 </div>
                             </Link>
                         </div>
            ))}
            </>
}
        </>
    )
}

export default Products;