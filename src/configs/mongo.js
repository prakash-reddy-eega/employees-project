const mongoose = require("mongoose");
console.log(`connectiong to ${process.env.MONGOURI}`)
mongoose.connect(process.env.MONGOURI, {}).then(()=> {
    console.log("Mongo DB Connected !!");
}).catch((err)=>{
    console.log("Error in Connecting MongoDb !!");
});