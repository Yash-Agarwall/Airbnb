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

to use .env in backend files we use a libraray named
dotenv which loads variables from a .env into process.env

require("dotenv").config();-> using the config method after requiring

if(process.env.NODE_ENV!="production"){
  require("dotenv").config();
} we do this to make sure that we do not upload these creentail of dotenv to production

npm i dotenv
npm i cloudinary
npm i multer-storage-cloudinary

now we want to make sure that we can access the cloudinary account
so make cloudinary.js file

first we do congig(matlab link karna)
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

then we make a storage 
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wanderlust_DEV',-> this is the name of the folder we are making
      allowedFormats: ["png", "jpg", "svg", "jpeg", "ico"],
    },
});
these will be used in listing.js

const {storage} = require("../cloudConfig.js");
const upload = multer({storage});-> notice that we have updated the destination of the nulter

Modification in routes:
.post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createListing));

in controller:
if createListing:
if (req.file) {
    newListing.image = {
      filename: req.file.public_id,
      url: req.file.secure_url || req.file.url,
    };

Now we are working on uploading the image while edit a listing
it is simple, just update enctype of the edit.ejs fomr to multipart
then in the routes, add a upload.single option, then in the controller
make a new listing and update its image using url from the req object and then 
do find by id and update the org listing


now to show preview of image we can do the following:
 <div class="mb-3">
    <img src="<%= listing.image.url %>">
  </div>

but this is not a good way, we should decrease the pixel size whiule previewing
module.exports.renderEditForm = wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit", { listing, originalImageUrl });
});
<div class="mb-3">
  <img src="<%= originalImageUrl %>">
</div>

--------------------------
i have skipped the map part
--------------------------

now we are adding the filter bar frontend only(to build the backne dwe ca add a cateorry
option in listnig scema)

//diaply: none , neither visible nor occupies space
visibility: hidden, space occupied but not visible