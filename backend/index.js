const mongoose= require("mongoose");
const app = require("./app");

let server=config.port;

mongoose.connect("mongodb+srv://Gourav:Greeshman97010@cluster0.yaoxdnm.mongodb.net/Xflix",
                { useNewUrlParser: true },
                ()=>{console.log("connected to mongodb")},
                e=>{console.error(e)});
                
app.listen(server,()=>console.log("Listening at port ",server));
