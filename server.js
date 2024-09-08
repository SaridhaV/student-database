const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const port=4000
const app=express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))


mongoose.connect('mongodb://127.0.0.1:27017/task2')
const db=mongoose.connection
db.once('open',()=>{
    console.log("Mongodb connection successful")
})
const userSchema=new mongoose.Schema({
    name:String,
    app_no:String,
    email:String,
    department:String,
    year:String,
    
    
})
const Users=mongoose.model("data",userSchema)


app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'))
})



app.post('/post',async(req,res)=>{
    const {name,app_no,email,department,year,graduate,quota}=req.body
    const user=new Users({
        name,
        app_no,
        email,
        department,
        year,
        graduate,
        quota
    })
    await user.save()
    console.log(user)
    res.send("Registration Successfully")

})


app.listen(port,()=>{
    console.log("server Started")

})