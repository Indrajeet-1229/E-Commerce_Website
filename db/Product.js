const { default: mongoose } = require("mongoose");
const mongooes=require("mongoose");
const productSchema=new mongooes.Schema({
    name:String,
    price:String,
    category:String,
    userId:String,
    company:String
});
module.exports=mongoose.model("products",productSchema);