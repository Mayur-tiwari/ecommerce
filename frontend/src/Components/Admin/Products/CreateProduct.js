import React, { useState } from 'react';
import "./CreateProduct.css";
import Sidebar from '../Sidebar/Sidebar';
import {useDispatch} from "react-redux";
import {createProduct} from "../../../Redux/actions/productAction";

const CreateProduct = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
const [price, setPrice] = useState(0);
const [description, setDescription] = useState("");
const [Category, setCategory] = useState("");
const [subCategory, setSubCategory] = useState("");
const [stock, setStock] = useState(0);
const [images, setImages] = useState([]);
const [imagePreview, setImagePreview] = useState([]);

const Categories = [
  "all",
  "featured",
]

const subCategories = [
  "laptop",
  "mobile",
  "watch",
  "accessories",
]

const createProductSubmitHandler = (e) => {
  e.preventDefault();

  const myForm = new FormData();

  myForm.set("name", name);
  myForm.set("price", price);
  myForm.set("description", description);
  myForm.set("category", Category);
  myForm.set("subCategory", subCategory);
  myForm.set("stock", stock);
  images.forEach((image) => {
    myForm.append("images", image);
  });
  dispatch(createProduct(myForm));
}

const createProductImageChange = (e) => {
  const files = Array.from(e.target.files);

  setImages([]);
  setImagePreview([]);

  files.forEach((file) => {
    const reader = new FileReader();
    reader.onload = () => {
      if(reader.readyState === 2){
        setImagePreview((old) => [...old, reader.result]);
        setImages((old) => [...old, reader.result]);
      }
    }
    reader.readAsDataURL(file);
  })
}

  return (
    <div className='dashboard'>
      <Sidebar/>
      <div className="createProduct-main">
            <h1>Create Product</h1>
        <form encType='multipart/form-data' onSubmit={createProductSubmitHandler} className="createProduct-form">
          <div>
            <h4>Product Name</h4>
            <input type='text' 
            name='name' 
            placeholder='Product Name' 
            value={name} 
            onChange={(e) => setName(e.target.value)}/>
          </div>
          <div>
            <h4>Price</h4>
            <input type='number' 
            name='price' 
            placeholder='Product Price' 
            value={price}
            onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <div>
            <h4>Product Description</h4>
            <textarea placeholder='Product Description' 
            cols='30' 
            rows='5'
            value={description}
            onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          <div>
            <select 
            onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {Categories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <select onChange={(e) => setSubCategory(e.target.value)}>
              <option value="">Choose SubCategory</option>
              {subCategories.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <h4>Stock</h4>
            <input type='number' 
            name='stock' 
            placeholder='Stock'
            value={stock}
            onChange={(e) => setStock(e.target.value)}/>
          </div>
          <div>
            <h4>Product image</h4>
            <input 
            type='file' 
            name='avatar' 
            accept='image/*' 
            onChange={createProductImageChange}
            multiple/>
          </div>
          <div>
            {imagePreview.map((item) => (
              <img src={item} alt='product'/>
            ))}
          </div>
          <div>
            <button className="create-btn">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateProduct;