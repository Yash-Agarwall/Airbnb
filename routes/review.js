const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const { reviewSchema } = require("../schema.js");

const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const ExpressError = require("../utils/ExpressError.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middleware.js");
const reviewController = require("../controllers/review.js");
//create review
router.post("/", isLoggedIn, validateReview, reviewController.createReview);

//delete review route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  reviewController.destroyReview,
);

module.exports = router;
