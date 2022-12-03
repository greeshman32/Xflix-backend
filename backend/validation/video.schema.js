const joi=require("joi");

const objectId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) {
      return helpers.message('\{\{#label\}\} must be a valid mongo id');
    }
    return value;
  };

const VideoLink= (value, helpers)=>{
    if(!value.match(/youtube.com[/]embed[/][\w\W]*/)){
        return helpers.message("Not a valid Link");
    }
    return value;
}



const valGenre=(value, helpers)=>{
    const geners={
        Education:true,
        Sports:true,
        Movies:true,
        Comedy:true,
        Lifestyle:true,
        All:true,
    }
    for(let i=0;i<value.length;i++){
        if(!geners[value[i]]) 
            return helpers.message('\{\{#label\}\} must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]');
    }
    return value;
}
   
const video={
    body: joi.object().keys({
        videoLink:joi.string().required().custom(VideoLink),
        title:joi.string().required(),
        genre:joi.string().required().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"),
        contentRating:joi.string().required().valid("Anyone", "7+", "12+", "16+", "18+"),
        releaseDate:joi.string().required(),
        previewImage:joi.string().required()
    })
}

const filter={
    query: joi.object().keys({
        genres:joi.custom(valGenre),
        sortBy:joi.valid("viewCount", "releaseDate"),
        contentRating:joi.valid("Anyone", "7+", "12+", "16+", "18+"),
        title:joi.string(),
    })
}

const vote={
    params: joi.object().keys({
        videoId:joi.string().required().custom(objectId)
    }),
    body: joi.object().keys({
        vote:joi.string().valid("upVote","downVote").required(),
        change: joi.string().valid("increase","decrease"),
    })
}

const videoid={
    params: joi.object().keys({
        videoId: joi.string().required().custom(objectId)
    }),
}


module.exports={
    filter,
    video,
    vote,
    videoid
}