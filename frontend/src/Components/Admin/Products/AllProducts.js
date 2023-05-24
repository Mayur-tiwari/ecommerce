import React, { useEffect } from 'react';
import "./AllProducts.css";
import Sidebar from '../Sidebar/Sidebar';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../../../Redux/actions/productAction";
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import {deleteProduct} from "../../../Redux/actions/productAction";
import { Button } from '@material-ui/core';
import { DELETE_PRODUCT_RESET } from '../../../Redux/constants/productConstants'; 


const AllProducts = () => {

  const dispatch = useDispatch();

  const {products} = useSelector((state) => state.allProducts); 
  const {isDeleted} = useSelector((state) => state.productAction); 

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id))
  }

  useEffect(() => {
    if(isDeleted){
      dispatch({type: DELETE_PRODUCT_RESET});
    }
    dispatch(getAllProducts());
  },[dispatch, isDeleted])

  
const rows: GridRowsProp = [];

const columns: GridColDef[] = [
  { field: 'id', headerName: 'Product Id', width: 210 }, 
  { field: 'name', headerName: 'Name', width: 250 },
  { field: 'price', headerName: 'Price', width: 150 },
  { field: 'category', headerName: 'Category', width: 150 },
  { field: 'stock', headerName: 'Stock', width: 150 },
  { field: 'actions', headerName: 'Actions', width: 150, 
  renderCell:(params) => {
    return(
      <div>
        <Link to={`/admin/product/${params.id}`}>
          <CiEdit/>
        </Link> 
        
        <Button onClick={() => deleteProductHandler(params.id)}><AiOutlineDelete /></Button>
      </div>
    )
  } },
];

products && products.forEach((item) => {  
  rows.push({
    id: item._id,
    name: item.name,
    price: item.price,
    category: item.category,
    stock: item.stock,
  })
});

let outOfStock = 0;
products && products.forEach((item) => {
  if(item.stock === 0){
    outOfStock++;
  }
})

  return (
    <div className='dashboard'> 
      <Sidebar/>
      <div className='admin-product-main'>
        <div className='admin-product-heading'>  
          <h2>Product Inventory</h2>
          <button><Link to="/admin/product">+ Create Product</Link></button>
        </div>
        {products && <div className='admin-product-over'>
          <div>
            <p>Total Products</p>
            <h1>{products.length}</h1>
          </div>
          <div>
            <p>Out Of Stock</p>
            <h1>{outOfStock}</h1> 
          </div>
          <div>
            <p>Categories</p>
            <h1>2</h1>
          </div>
          <div>
            <p>Sub Categories</p>
            <h1>4</h1>
          </div>
        </div>}
        
        <div style={{ height: "27vmax", width: '100%' }}>
      <DataGrid className='admin-products-table' rows={rows} columns={columns} initialState={{
    pagination: { paginationModel: { pageSize: 5 } },
  }}
    pageSizeOptions={[5, 10, 25]} disableRowSelectionOnClick disableColumnSelector/>
    </div>
      </div>
    </div>
  )
}

export default AllProducts;