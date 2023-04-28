const { default: mongoose } = require("mongoose");
const mongooes=require("mongoose");
const userSchema=new mongooes.Schema({
    name:String,
    email:String,
    password:String
});
module.exports=mongoose.model("users", userSchema);