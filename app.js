const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const Listing = require("./models/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const engine = require("ejs-mate");
const {listingSchema} = require("./schema.js");

app.engine("ejs", engine);

main()
  .then(() => {
    console.log("Connect to db");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("hii i am get api");
});

//index route
app.get(
  "/listings",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings });
  }),
);

//new route
app.get("/listings/new", (req, res) => {
  res.render("listings/new");
});

//create route
app.post(
  "/listings",
  wrapAsync(async (req, res, next) => {
    // const listing = req.body?.listing;

    // if (!listing) {
    //   throw new ExpressError(400, "Send valid listing data");
    // }

    // const { title, description, price, country, location } = listing;
    // if (!title ||!description ||price === undefined ||price === null ||price === "" ||!country ||!location
    // ) {
    //   throw new ExpressError(
    //     400,
    //     "All required listing fields must be filled out",
    //   );
    // }
    let result = listingSchema.validate(req.body);
    console.log(result);
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    res.redirect("/listings");
  }),
);

//show route
app.get(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", { listing });
  }),
);

//Edit route
app.get(
  "/listings/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    res.render("listings/edit", { listing });
  }),
);

//update route
app.put(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }),
);

//delete route
app.delete(
  "/listings/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
  }),
);

//this is needed to catch the non existent routes, earlier the syntax was app.all but its no longer valid
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

//custom error handler-> this is the actual handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

let port = 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
