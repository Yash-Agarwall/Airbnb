const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../models/listing.js");
const ExpressError = require("../utils/ExpressError.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");
router.param("id", (req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  next();
});

//index route
router.get("/", wrapAsync(listingController.index));

//new route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//redirect helper for common signup path typo, needed to it doenst clash with /listings/:id
router.get("/signup", (req, res) => {
  res.redirect("/signup");
});
//needed so that /logout doesnt overlap with /:id
router.get("/logout", (req, res) => {
  res.redirect("/logout");
});

//create route
router.post("/", isLoggedIn, validateListing, listingController.createListing);

//show route
router.get("/:id", listingController.showListing);

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

//update route
router.put("/:id", isLoggedIn,isOwner,validateListing, listingController.updateListing);

//delete route
router.delete("/:id", isLoggedIn, isOwner, listingController.destroyListing);

module.exports = router;
