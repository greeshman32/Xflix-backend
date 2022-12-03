const express = require("express");
const compression = require("compression");
const cors = require("cors");
const router = require("./routes/router");
const helmet = require("helmet");


const app = express();


app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors(),()=>console.log(cors()));



// Reroute all API request starting with "/v1" route
app.use("/v1", router);
 
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    res.status(404).send("Unknown rout");
});



module.exports = app;
