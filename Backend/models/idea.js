const mongoose =require("mongoose");

const ideaSchema= new mongoose.Schema({
    prompt : String ,
    aiResponse: String ,
    category: String  

}, { timestamps: true });
module.exports=mongoose.model('Idea' ,ideaSchema);