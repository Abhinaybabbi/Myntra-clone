require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const userRouter = require("./Routes/user");

const requireLogin = require("./middleware/requireLogin");
const Data = require("./Models/data");
const Item = require("./Models/item")


app.use(bodyParser());
app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(require("./Routes/auth"));
app.use(require("./Routes/test"));


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
    const data = await Item.find({})      
 
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
app.post("/",async(req,res)=>{
  try{
    const id=req.body;
    
    console.log(id)
    await Item.findByIdAndDelete({id})
    return res.send({
      status:"succesfull",
      }) 


  }catch(e){
    res.json({
      status:"failed",
      message:e.message
    })

  }

})
app.post("/data",async (req,res)=>{
  try{  
  const {data}=req.body;
  console.log(data)
  await Data.create(data)
    return res.send({
      status:"succesfull",
      data:{
        data
      }}) 
  }catch(e){
    res.json({
      status:"failed",
      message:e.message
     
    })}   
})

app.post("/item",async (req,res)=>{
  try{
    
    const {   category,    description,    id,    image,    price,       title,    } = req.body;
  
    const item= new Item({
      category,
      description,
      id,
      image,
      price,     
      title,
    });
    item.save()
      .then((item) => {
        res.json({ message: "saved successfully",
      item });
      })
      .catch((err) => {
        console.log(err);
      });

    // await Item.create({data})
    // return res.send({
    //   status:"successfull",
    //   data:{data}

    // })
  }
  catch(e){
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
