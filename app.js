const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

const ExpressError = require("./utils/ExpressError.js");
const engine = require("ejs-mate");
app.engine("ejs", engine);

const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const session = require("express-session");
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

const sessionOptions = {
    secret: "mysupersecretcode",
    resave: false,           
    saveUninitialized: true,
    //here we are setting the expiry date of a cookie
    cookie: {
      expires: Date.now() + 7*24*60*60*1000,
      maxAge: 7*24*60*60*1000,
      httpOnly: true, //this is for security purpose, to avoid cross scripting attacks
    }
}
app.use(session(sessionOptions));

app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { err });
});

let port = 8080;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
