const mongoose = require("mongoose")

const departmentSchema = new mongoose.Schema({
    department: String
 }); 

 module.exports = mongoose.model("department1", departmentSchema, "department");