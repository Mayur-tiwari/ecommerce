const Product = require("../models/productModels");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");

// Creating All product -- Admin

exports.createProduct = catchAsyncErrors(async (req,res,next) => {

    let images = [];

    if(typeof req.body.images === "string"){
        images.push(req.body.images);
    }else{
        images = req.body.images;
    }

    const imagesLink = [];

    for(let i = 0; i < images.length; i++){
        const result = await cloudinary.v2.uploader.upload(images[i], {
            folder:'products'
        })

        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        })
    }

    req.body.images = imagesLink;
    req.body.user = req.user.id;


    const product = await Product.create(req.body);

    res.status(201).json({ 
        success: true,
        product
    }) 
});


// Get all products
exports.getAllProducts = catchAsyncErrors(async (req,res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
});


// Get Featured products
exports.getFeaturedProducts = catchAsyncErrors(async (req,res) => {

    const products = await Product.find({category: "featured"});

    res.status(200).json({
        success: true,
        products
    })
});

//Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req,res, next) =>{
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }
    
    res.status(200).json({
        success:true,
        product
    })
});

//Update Product
exports.updateProduct = catchAsyncErrors(async (req,res,next) => {
    let product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true,
        useFindAndModify:false
    })
    res.status(200).json({
        success: true,
        product
    })
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if(!product){
        return next(new ErrorHandler("Product not Found", 404));
    }

    await product.deleteOne();

    res.status(200).json({
        success:true,
        message: "Product Deleted Successfully"
    })
});