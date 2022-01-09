require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRouter = require("./Routes/user");

const requireLogin = require("./middleware/requireLogin");
const Data = require("./Models/data");


app.use(bodyParser());
app.use(cors());
app.use(express.static("./public"))
app.use(require("./Routes/auth"));


// app.all("*",(req,res)=>{
//   res.status(404).send("<h1> 404 !! You shouldn't be here... <h1> ")
// })

mongoose.connect(`${process.env.MongodbServer}`, (err, then) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected to mongoDB");
  }
});


app.get("/", async function (req, res) {
  try {
    const data = await Data.find({"data.id":1})      
 
    return res.json({
        data,
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});
app.post("/data",async (req,res)=>{
  try{
  
  const data=req.body;
  await Data.create(data)
    return res.send({
      status:"succesfull",
      data:{
        data
      }

    })
  
  
  }catch(e){
    res.json({
      status:"failed",
      message:e.message
    })
  }
  
    
})

app.use(express.json());
app.use(bodyParser.json());
app.use("./user",userRouter);

require("./Models/user");
app.use(require("./Routes/auth"));

app.listen("5000", () => console.log("server is running in 5000"));
