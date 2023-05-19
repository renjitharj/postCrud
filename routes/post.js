const express = require("express");
const router = express.Router();
const validatetoken = require("../helpers/validateToeken")
const userController = require("../controllers/postController")
const imageUpload=require('../helpers/filesupload')
router.post('/create',validatetoken.validateToken,imageUpload.single('file'), userController.PostCreate)
router.get('/getPosts', validatetoken.validateToken,userController.GetPost)
router.patch('/update/:id',validatetoken.validateToken,imageUpload.single('file'), userController.UpdatePost)
router.delete('/delete/:id' ,validatetoken.validateToken,userController.DeletePost)
module.exports = router;