const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const RegisterModel = require('./models/Register')

const app = express()
app.use(cors({
    origin: ["https://new-front-three.vercel.app"],
    methods:["GET","POST"],
    credentials:true

}))
app.use(express.json())

const connection=()=>{
    mongoose.connect('mongodb+srv://rashmi:rashmi123@cluster0.pszpa.mongodb.net/testes?retryWrites=true&w=majority&appName=Cluster0').then(()=>{
        console.log("Db Connected");

    }).catch((error)=>{
       console.log(error);
    })
    
}
connection();

app.get('/',(req, res)=>{
res.json("Hello ji")
})

app.post('/register', (req, res) =>{
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user =>{
        if(user) {
            res.json("Already have an account")
        }else{
            RegisterModel.create({name:name, email:email, password:password})
            .then(result => res.json("Account created"))
            .catch(err => res.json("Error"))
        }
    }).catch(err => res.json(err))
})


app.listen(3001, () =>{
    console.log("server is running")
})
