const mongoose =require("mongoose");
mongoose.connect("mongodb://localhost:27017/admin");
const database=mongoose.connection
database.once("open",(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log("database is connected");
    

})
module.exports=database;