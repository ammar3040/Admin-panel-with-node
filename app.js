const express = require("express");
const Routeroutes = require("./routes/index"); 

const database=require("./config/db")



const app = express();
const port = 8001;
const path = require("path");
const exp = require("constants");
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.urlencoded())

app.use("/", Routeroutes);
app.use (express.static(path.join(__dirname,"assets")))
app.use ("/uploads",express.static(path.join(__dirname,"uploads")))

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
