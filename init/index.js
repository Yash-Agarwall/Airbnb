const mongoose=require("mongoose");

const initData= require("./data.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing.js");

main()
.then(() => {
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB= async() => {
    //if the db already contains some data then we clean it first
    await Listing.deleteMany({});

    //then we initialize the database, we are accessing the 
    //data key of initData object
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();//call the initDB function

