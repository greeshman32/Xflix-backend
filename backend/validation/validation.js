const joi=require("joi");



const pick=(object,keys)=>{
    return keys.reduce((obj,key) => {
        if(object && Object.prototype.hasOwnProperty.call(object,key)){
            obj[key] = object[key];
        }
        return obj;
    },{});
}



const validator= (schema) => (req,res,next) => {

    if(req.query.contentRating) req.query.contentRating = decodeURI(req.query.contentRating);
    if(req.query.genres) req.query.genres=req.query.genres.split(",");
    const validSchema = pick(schema, ["params","query","body"]);

    const object=pick(req,Object.keys(validSchema));

    const {value , error}=joi.compile(validSchema)
    .prefs({ errors: { label: "key" } })
    .validate(object);

    if (error) {
        const errorMessage = error.details
          .map((details) => details.message)
          .join(", ");
        res.status(400).send({code:400,message:errorMessage});
        next(error);
    }
      
    Object.assign(req, value);
    
    return next();
}

module.exports=validator;