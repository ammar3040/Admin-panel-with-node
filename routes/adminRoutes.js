const express = require("express");
const adminctl = require("../controllers/asdminController");
const adminModel=require("../models/AdminModel")

const routes = express.Router();

routes.get("/", adminctl.dashboard);
routes.get("/addform",adminctl.AddAdminForm)

routes.get("/datatable",adminctl.AdminTable)
routes.post("/insertData",adminModel.uploadImage,adminctl.insertData)
routes.post("/updateData",adminModel.uploadImage,adminctl.updateData)
routes.get("/delete",adminctl.AdminDelete)
routes.get("/edit",adminctl.AdminEdit)

module.exports = routes;
