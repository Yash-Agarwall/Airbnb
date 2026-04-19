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

---------------
now we will use router.route
unlike router.use, it allows us to define all kind of request(get/post/etc) to the same path 
at one place without redeifing the paths again and again 

i have made a listingRoutes.txt file to see how it was before

then we used statrabitlity for rating(basic ui)


---------------
Image: to upload the image we will need to use the encoding tyoe(enctyppe) of the form as multipart data instead of the 
normal urlencoded data that we were using till now

if we just simply set the form type to multipart and try submitting it then
it will not work, the backend wont understand the res opbject, as rn we are using urlencoded parsing

so form parsing multipart data we will nedd to use something calles as 
MULTER
const multer = require("multer");
const upload = multer({dest : 'uploads/'})

this is the new post route thing:
.post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));

right now it is saving to local only, but we watnt o save to cloud storage
