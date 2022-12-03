const service=require("../services/video.services");
const Video = require("../module/video");



const filter = async(req,res)=>{
    const title = req.query.title;
    let gener = req.query.genres;
    let rating = req.query.contentRating;
    let videos = await Video.find();
    let sort=req.query.sortBy;

    if(sort)
    videos = service.Sort(videos,sort);
    
    if(rating) videos=service.FilterByContentRating(videos,rating);
    
    if(gener){
        let obj={};
        for(let i=0;i<gener.length;i++){
            obj[gener[i]]=true;
        }
        
        videos = service.FilterByGener(videos,obj);
    }
    
    if(title){
        videos = service.FilterByTitle(videos,title);
    }
    
    res.status(200).send({ videos });

}

const videoID=async(req,res)=>{
    const id=req.params.videoId;
    const video = await service.getVideo(id);
    if(!video)
    {
        res.status(404).send({code:404,message:"No video found with matching id"});
        return;
    }
    
    res.status(200).send( video );
}
 
const addVideo= async(req,res)=>{
    const obj=req.body;
    const video = await Video.create(obj).catch(err=>{
        res.status(400).send(err);
    });
    
    res.status(200).send(video);
}

const votes=async (req,res)=>{
    const id = req.params.videoId;
    const vote = req.body.vote+"s";
    const change = req.body.change;
    
    const video = await service.getVideo(id);
    if(!video)
    {
        res.status(404).send({code:404,message:"No video found with matching id"});
        return;
    }
    
    if(change === "increase")
        video.votes[vote] = video.votes[vote] + 1;
    else if(change === "decrease" && video.votes[vote]>0)
    video.votes[vote] = video.votes[vote] - 1;
    
    await video.save();
    res.status(200).send({videos:video});    
}
 
const IncreseViewCount =async (req,res)=>{
    const id = req.params.videoId;
    const video = await service.getVideo(id);
    console.log(id);
    if(!video)
    {
        res.status(404).send({code:404,message:"No video found with matching id"});
        return;
    }
    video.viewCount= video.viewCount + 1 ;
    await video.save();
    console.log(video);
    res.status(200).send({videos:video});
}

 
module.exports={
    filter,
    videoID,
    addVideo,
    votes,
    IncreseViewCount,
}