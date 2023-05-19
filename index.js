const express=require('express')
const mongoose  = require('mongoose')
const bodyParser=require('body-parser')
const app=express()
const port=5000
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json({ limit: "100mb" }));
const userRoute=require('./routes/user')
const postRoute=require('./routes/post')
mongoose.connect('mongodb://localhost:27017/postCrud',{
   
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log("suc");})
.catch((err)=>{console.log(err);})
app.use('/user',userRoute)
app.use('/post',postRoute)
app.listen(5000,()=>console.log("app listening"))