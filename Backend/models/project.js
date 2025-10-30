const mongoose =require("mongoose");

const projectFschema= new mongoose.Schema({
    projectName :{ type: String ,required: true },
    description :{ type: String ,required: true },
   owner:{ type:  String/* mongoose.Schema.Types.ObjectId, ref:'user',required: true */},
   members:[{type:String /* mongoose.Schema.Types.ObjectId, ref:'user' */}]

}, { timestamps: true });
module.exports = mongoose.models.projectf || mongoose.model("projectf", projectFschema);