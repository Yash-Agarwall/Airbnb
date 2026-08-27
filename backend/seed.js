const mongoose = require("mongoose");
require("dotenv").config();

const Listing = require("./src/models/listing");
const sampleData = require("./data/data");

async function seedDB() {
  try {
    await mongoose.connect(process.env.ATLASDB_URL);

    console.log("Connected to MongoDB");

    await Listing.deleteMany({});
    await Listing.insertMany(sampleData.data);

    console.log("Database seeded successfully!");

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedDB();