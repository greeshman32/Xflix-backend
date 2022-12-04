const mongoose= require("mongoose");
const app = require("./app");

let server=config.port;

mongoose.connect("mongodb+srv://Gourav:<Greeshman97010>@cluster0.yaoxdnm.mongodb.net/xflix");
                
app.listen(server,()=>console.log("Listening at port ",server));
