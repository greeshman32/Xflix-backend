const { required } = require("joi");
const mongoose=require("mongoose");


const schemaVideo=mongoose.Schema(
    {
        
        videoLink:{
            type: String,
            required: true,
        },
        title:{
            type: String,
            require: true
        },
        genre:{
            type:String,
            require:true,
        },
        contentRating:{
            type:String,
            require:true,
        },
        releaseDate:{
            type:String,
            require:true,
        },
        previewImage:{
            type:String,
            require:true,
        },
        votes:{
            upVotes:{
                type:Number,
                require:true,
                default:0,
                required:true
            },
            downVotes:{
                type:Number,
                require:true,
                default:0,
                required:true
            }
        },
        viewCount:{
            type:Number,
            require:true,
            default:0,
            required:true,
        },
    }
);


const Videos = mongoose.model("Videos",schemaVideo,"Videos");


    
module.exports = Videos;         