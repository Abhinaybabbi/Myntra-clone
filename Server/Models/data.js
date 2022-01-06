const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    data:[]


});

const Data = mongoose.model("Data", dataSchema);
module.exports = Data;
