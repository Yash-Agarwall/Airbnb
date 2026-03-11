const mongoose=require("mongoose");

const data= require("./data.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("./models/listing.js");

main()
.then(() => {
    console.log("connected to db");
})
.catc((err)=>{
    console.log(err);
})

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB= async() => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
}