const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
    emp_name: String,
    designation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'designation1',
        autopopulate: true
    },
    emp_id: Number,
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'department1',
        autopopulate: true
    },
    salary: String,
    email_id: String,
 }); 

 employeeSchema.plugin(require('mongoose-autopopulate'));

 module.exports = mongoose.model("employees", employeeSchema, "employees")