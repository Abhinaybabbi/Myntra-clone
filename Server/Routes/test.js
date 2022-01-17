const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Item = require("../Models/item");

router.get("/home",async (req,res)=>{
    try{
        const data = await Item.find({})
        return res.json({
            data

        })
    }catch(e){
        return res.send({
            status:"failed",
            message:e.message,
        })
    }
     
});
router.post("/home",)

module.exports=router;
