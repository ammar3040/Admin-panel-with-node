const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");

const adminImg = "uploads/adminsImg";

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
    city: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  hobby: {
    type: Array,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  created_date: {
    type: String,
    required: true,
  },
  updated_date: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
});
 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "..", adminImg));
  },
  filename: function (req, file, cb) {
 
  cb(null, "profileImage-" + Date.now() );
},
});

adminSchema.statics.uploadImage = multer({ storage: storage }).single("profileImage");
adminSchema.statics.imagePath = adminImg;

const admin = mongoose.model("admin", adminSchema);
module.exports = admin;
