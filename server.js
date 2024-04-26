const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const port = process.env.PORT || 3019;

const app = express();


app.use(express.urlencoded({extended:true}));

mongoose.connect('mongodb+srv://misshack:JAYENDRA@cluster.4xpadjf.mongodb.net/:admin');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open',()=>{
console.log("mongodb connection successfull");
});
const userSchema = new mongoose.Schema({
    name:String,
    password:String
});

const User = mongoose.model("User",userSchema);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'form.html'));
});

app.post('/post',async (req,res)=>{
try{
    const { name, password } = req.body;
    const user = new User({
      name,
      password,
    });
    await user.save();
    console.log('User saved:', user);
    res.send('Form Submission Successful');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).send('Internal Server Error');
  }
});


app.get('/hello',(req,res)=>
{
    res.send("Hello world")
});

 app.listen(port,() =>{
    console.log("Server started on port ${port}");
 });
