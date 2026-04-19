const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listing.js");
router.param("id", (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  next();
});

router
  .route("/")
  //index route
  .get(wrapAsync(listingController.index))
  //create route
  .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));
//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//needed to it doesnt clash with /listings/:id
router.get("/signup", (req, res) => {
  res.redirect("/signup");
});
//needed so that /logout doesnt overlap with /:id
router.get("/logout", (req, res) => {
  res.redirect("/logout");
});

router
  .route("/:id")
  //show route
  .get(listingController.showListing)
  //update route
  .put(isLoggedIn, isOwner, validateListing, listingController.updateListing)
  //delete route
  .delete(isLoggedIn, isOwner, listingController.destroyListing);

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;
