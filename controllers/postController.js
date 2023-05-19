const asyncHandler = require("express-async-handler");
const postModel = require("../models/postModel");
const fs = require('fs');

exports.PostCreate = asyncHandler(async (req, res) => {
  req.body.addedBy = req.decoded.id;
  req.body.file = req.file.path;
  req.body.filename = req.file.filename
  await postModel
    .create(req.body)
    .then((postNew) => {
      res.status(201).send({
        data: postNew,
        message: "Post created successfully",
        status: true,
      });
    })
    .catch((err) => {
      res.send({
        data: null,
        message: "Coulnt create post",
        status: false,
        error: err.message,
      });
    });
});

exports.GetPost = asyncHandler(async (req, res) => {
  var posts = await postModel.find({ addedBy: req.decoded.id });
  if (!posts) {
    return res.status(200).json({
      data: null,
      status: false,
      message: "No Post created for that user",
    });
  } else {
    return res.status(200).send({
      data: posts,
      message: "post fetched successfully",
      status: true,
    });
  }
});
exports.UpdatePost = asyncHandler(async (req, res) => {
    const id=req.params.id
    const body=req.body
    const name=body.name
    const description=body.description
    var obj = await postModel.findById(id)
    const updates = {
       name,description
    }
    if (req.file) {
        var urlPath = './images/' + obj.filename
        const file = req.file.path
        const filename = req.file.filename
                updates.file = file
        updates.filename = filename
       

    }

  const post = await postModel.findByIdAndUpdate(
    req.params.id,
   updates,
    { useFindAndModify: true,new:true }
  );
  if (req.file) {
    fs.unlink(urlPath, (err => {
        if (err) {
            res.status(404).write("error")
        }
        else{console.log("image deleted");}

    }))

}

  return res.status(200).send({
    message: " post updated successfully",
    status: true,
  });
});

exports.DeletePost = asyncHandler(async (req, res) => {
   
    const id = req.params.id
    var obj = await postModel.findById(id)
    var urlPath = './images/' + obj.filename
    leadobj = await postModel.findByIdAndRemove(id)

   console.log(urlPath)
    fs.unlink(urlPath, (err => {
        if (err) {
            res.status(404).send("Couldnt delete image ")
        }

    }))

    res.send("Deleted Successfully")

    }

  
 
);
