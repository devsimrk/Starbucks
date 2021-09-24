if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
const express = require("express")
const app = express()
const path = require("path")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")



mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true})
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("Connected to Mongoose"))


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    Message: String
    
});
const Starbucks = mongoose.model('Starbucks', contactSchema);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + "/static"))
app.use(express.static(__dirname + "/static/img"))





app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname + "index.html"))
})
app.get("/contact",(req,res)=>{
    res.sendFile(path.join(__dirname + "/static/contact.html"))
    
})
app.post("/contact", (req, res)=>{
    let myData = new Starbucks(req.body)
    myData.save().then(()=>{
    res.send("Submission Successful")
    }).catch(()=>{
    res.status(400).send("Submission not successful")})
    
})




app.listen(process.env.PORT || 3000)