const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const DEFAULT_LISTING_IMAGE = "/images/default-listing.svg";
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      //we can paste link of any image in place of default link

      //if no image is coming
      default:
        "https://images.unsplash.com/photo-1672841828482-45faa4c70e50?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      //this is used when image is coming but it is empty
      set: (v) =>
        v === ""
          ? "https://images.unsplash.com/photo-1672841828482-45faa4c70e50?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          : v,
    },
  },
  price: Number,
  location: String,
  country: String,
  //here we are establishing a realtion between review and listing models
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }
});

listingSchema.post("findOneAndDelete", async (listing) =>{
    await Review.deleteMany({_id: {$in: listing.reviews}});
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
