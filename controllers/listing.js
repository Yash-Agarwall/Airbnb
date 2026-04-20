const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

module.exports.createListing = async (req, res, next) => {
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  if (req.file) {
    newListing.image = {
      filename: req.file.public_id,
      url: req.file.secure_url || req.file.url,
    };
  }
  await newListing.save();
  req.flash("success", "New listing created");
  return res.redirect("/listings");
};

module.exports.showListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  console.log(listing);
  res.render("listings/show", { listing });
});

module.exports.renderEditForm = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { listing });
});

module.exports.updateListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  const updatedListing = { ...req.body.listing };
  if (req.file) {
    updatedListing.image = {
      filename: req.file.public_id,
      url: req.file.secure_url || req.file.url,
    };
  }
  await Listing.findByIdAndUpdate(id, updatedListing);
  res.redirect(`/listings/${id}`);
});

module.exports.destroyListing = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing deleted successfully");
  res.redirect("/listings");
});
