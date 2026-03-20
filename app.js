const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing = require("./models/listing.js");
const path= require("path");
const methodOverride=require("method-override");

//write an async function for database
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

const engine = require("ejs-mate");
app.engine("ejs", engine);

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
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));

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

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new")
})

//show route
app.get("/listings/:id", async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show",{listing});
});

//create route
app.post("/listings", async (req,res) => {
    // let {title, description, image, price, country, location} = req.body;-> this is one way of passin, but we woul be using the listing[title] in the .ejs itself
    // let listing= req.body.listing;-> we do not do this, we create a new js obj
    //this will give us a new instance of an object with the fields entered by the user
    const newListing=new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
    // console.log(listing);
});

//Edit route
app.get("/listings/:id/edit", async(req,res)=>{
    let {id}=req.params;
    const listing= await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit",{listing});
})

//update route
app.put("/listings/:id", async(req,res)=>{
    let {id}=req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`);
})

//delete route
app.delete("/listings/:id", async (req,res)=>{
    let {id}=req.params;
    let deletedListing= await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
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