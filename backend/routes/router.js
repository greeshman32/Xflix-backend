const express = require("express");
const router = express.Router();
const schema = require("../validation/video.schema");
const validate = require("../validation/validation")
const controller = require("../controller/video.controller");


router.get("/videos",validate(schema.filter),controller.filter);


router.get("/videos/:videoId",validate(schema.videoid),controller.videoID);

router.post("/videos",validate(schema.video),controller.addVideo);

router.patch("/videos/:videoId/votes",validate(schema.vote),controller.votes);

router.patch("/videos/:videoId/views",validate(schema.videoid),controller.IncreseViewCount);

module.exports = router;