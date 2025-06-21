const bcrypt = require("bcrypt");
const moment = require("moment");
const Admin = require("../models/AdminModel")
const fs = require('fs');
const path = require('path');



module.exports.dashboard = (req, res) => {
 return res.render("dashboard") 
};


// addForm
module.exports.AddAdminForm=(req,res)=>{
    return res.render("AddAdminform")
}


// admintable
module.exports.AdminTable=async (req,res)=>{

  let allAdminData= await Admin.find();

    return res.render("AdminDataTable",{allAdminData})
}
module.exports.insertData= async(req,res)=>{
try{
req.body.name= req.body.firstname+" "+req.body.lastname
  req.body.password= await bcrypt.hash(req.body.password, 10);
  if(req.file){
    req.body.image=Admin.imagePath+"/"+req.file.filename;
  }

  req.body.created_date = moment().format("DD-MM-YYYY, h:mm:ss A");
  console.log(req.body.created_date);
  
  req.body.updated_date = moment().format("DD-MM-YYYY, h:mm:ss A");
  let addAdmindata=await Admin.create(req.body)
if(addAdmindata){
    console.log("data inserted in mongo");
    return res.redirect("/admin/addform")
    
}else{
    console.log("data not inserted");
    
}

}catch(err){
console.log(err);
}

return res.redirect("/admin/addform");
}


// admin Crud


// adminDelete

module.exports.AdminDelete=async(req,res)=>{
try{
  let adminId=req.query.adminId;
 AdminData= await Admin.findOne({_id:adminId})
if(AdminData.image){

// Define the relative or absolute path to the file
const filePath = path.join(__dirname,"..",AdminData.image);

// Delete the file
fs.unlink(filePath, (err) => {
  if (err) {
    console.error('Error while deleting file:', err);
  } else {
    console.log('File deleted successfully');
  }
});
  
}
  

    
   let deleteAdmin =await Admin.findByIdAndDelete(adminId);
   if(deleteAdmin){
    console.log("Admin deleted");
    
   }else{
    console.log("Admin not deleted");
   }
 


  
}catch(err){
console.log(err);
}
return res.redirect("/admin/datatable")

}


// edit form 
// module.exports.EditAdminForm=(req,res)=>{
//   res.render("EditAdminForm");
// }


module.exports.AdminEdit=async(req,res)=>{
  try{



 let AdminId =req.query.adminId;
 AdminData= await Admin.findOne({_id:AdminId})
 if(AdminData){

 return res.render("EditAdminForm",AdminData)


 }else{

  console.log("admin data not found in edit ");
  res.redirect("/admin/dataTable")
  
 }


 }catch(err){
console.log(err);
}
return res.redirect("/admin/datatable")


}
module.exports.updateData = async (req, res) => {
  try {
    req.body.name = req.body.firstname + " " + req.body.lastname;
    const existingAdmin = await Admin.findById(req.body.id);
    if (req.file) {
      req.body.image = Admin.imagePath + "/" + req.file.filename;

      const oldImagePath = path.join(__dirname, "..", existingAdmin.image);

      try {
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
          console.log("Old image deleted successfully.");
        } else {
          console.log("Old image not found");
        }
      } catch (deleteErr) {
        console.error("Error deleting old image:", deleteErr);
  
      }
    }

    req.body.updated_date = moment().format("DD-MM-YYYY, h:mm:ss A");

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.body.id,
      { $set: req.body },
      { new: true }
    );

    if (updatedAdmin) {
      console.log("Update successful");
    } else {
      console.log("Update unsuccessful");
    }

  } catch (err) {
    console.error("Update Error:", err);
  }

  return res.redirect("/admin/datatable");
};