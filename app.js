const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing.js");
const path= require("path");

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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended:true}));

let port=8080;

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})

app.get("/",(req,res)=>{
    res.send("hii i am get api");
})


//index route
app.get("/listings",async (req,res)=>{
    //.find will return a promise, now to send it to ejs file we 
    //will make the function async coz it prevent callback hell(by mutliple then catch) in case of many things
    // Listing.find({}).then((listings) => {
    //     // res.send(listings);
    //     console.log(listings);
    // });
    const allListings = await  Listing.find({});
    res.render("listings/index",{allListings});
});

//show route
app.get("/listings/:id", async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show",{listing});
})

// app.get("/testListing", async (req,res)=>{
//     let sampleListing= new Listing({
//         title: "My new villa",
//         description:" beachside",
//         price:1200,
//         location: "Calcutta",
//         country: "india",
//     });

//     //here we are waiting for the program to save the listing
//     await sampleListing.save();
//     console.log("Samplel saved");
//     res.send("suuccessful");
// })