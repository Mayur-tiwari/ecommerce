const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const errorMiddleware = require("./middleware/error");
const path = require("path");

if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path: "backend/config/config.env"})
}

app.use(express.json({limit:'50mb'}));
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

//Route imports
const product = require("./routes/productRoute");  
const user = require("./routes/userRoute");

app.use("/api/v1",product)
app.use("/api/v1",user);

app.use(express.static(path.join(__dirname,"../frontend/build")));


app.get("*",(req,res) => (
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
))


//Middleware for error
app.use(errorMiddleware);

module.exports = app;