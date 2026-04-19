model-> stores core functionality of db
view-> core functionality of frontend
controller-> core finctionality of backend

listing: 

const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};



//bascially we have shifted the code into a funciton named index
router.get("/", wrapAsync(listingController.index));
router.get("/", wrapAsync(.index));

in resume mention that you have implemented a full stack project using the MVC framework