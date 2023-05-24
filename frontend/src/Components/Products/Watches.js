import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllProducts } from '../../Redux/actions/productAction';

const Watches = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.allProducts.products);
    
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
            {products && products.map((item, index) => {
                if(item.subCategory === "watch"){
                    return(
                    <div className='products-main' key={index}>
                <Link to={`/product/${item._id}`}>
                    <div className='products-container'>
                        <div className='products-image'>
                            <img src={item.images[0].url} alt={item._id} />
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
            </div>)
                }
                return null;
            })}
        </>
    )
}

export default Watches;