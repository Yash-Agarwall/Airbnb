const Listing = require("../models/listing");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");

module.exports.createReview = wrapAsync(async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  let newReview = new Review(req.body.review);

  newReview.author = req.user._id;
  listing.reviews.push(newReview._id); //stores reference

  await newReview.save(); //save actual data to db
  await listing.save(); //save relationship
  req.flash("success", "Review added successfully");
  res.redirect(`/listings/${listing._id}`);
});

module.exports.destroyReview = wrapAsync(async (req, res) => {
  let { id, reviewId } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review deleted successfully");
  res.redirect(`/listings/${id}`);
});
