const mongoose = require("mongoose");
const itemSchema = new mongoose.Schema({
    category: {type:String},
    description: {type:String},
    id: {type:Number},
    image: {type:String},
    price: {type:Number},
    rating: [{rate:{type: Number}, count:{type: Number}}],
    title:{type:String},
    qty:{type:Number},


});
const dataSchema = new mongoose.Schema({
    data:[itemSchema]


});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
