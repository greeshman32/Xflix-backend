const mongoose= require("mongoose");
const app = require("./app");

let server=config.port;

mongoose.connect("mongodb//127.0.0.1:24047");
                
app.listen(server,()=>console.log("Listening at port ",server));