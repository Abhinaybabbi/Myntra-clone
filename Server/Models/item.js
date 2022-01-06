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

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
