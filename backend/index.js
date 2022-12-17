const mongoose= require("mongoose");
const app = require("./app");

let server=8082;

mongoose.connect();
                
app.listen(server,()=>console.log("Listening at port ",server));
