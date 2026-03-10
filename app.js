const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing.js");

//write an async function for database
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connect to db");
})
.catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect(MONGO_URL);
     
}

let port=8080;
app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

app.get("/",(req,res)=>{
    res.send("hii i am get api");
})

app.get("/testListing", async (req,res)=>{
    let sampleListing= new Listing({
        title: "My new villa",
        description:" beachside",
        price:1200,
        location: "Calcutta",
        country: "india",
    });

    //here we are waiting for the program to save the listing
    await sampleListing.save();
    console.log("Samplel saved");
    res.send("suuccessful");
})