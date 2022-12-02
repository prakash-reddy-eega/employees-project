
const employeeDetailsServices = require('../services/employeeDetails.services')
const { Department } = require("../models/index");
const {Employee} = require("../models/")

const {LocalStorage}  =  require('node-localstorage') 
var localStorage = new LocalStorage('./scratch')


function header(req, res) {
    try {
        res.render("pages/home");
    } catch (error) {

    }
}

async function allEmployees(req, res) {
    try {
        const parsedData = await employeeDetailsServices.employees()
        res.render('pages/employees', { parsedData })
    } catch (error) {

    }
}

async function getEmployee(req, res) {
    try {
        const parsedData = await Employee.find()
        res.render('pages/getEmployee/getEmployee', {parsedData})
    } catch (error) {
    }
}

async function singleEmployeeDetails(req, res) {
    try {
        const result = await employeeDetailsServices.getEmployeeDetails(req)
        if (result['status'] == 200) {

            res.status(200).render('pages/employeeDetails', result['data'])
        } else {
            res.status(404).send({
                'message': 'Not Found'
            })
        }
    } catch (error) {

    }
}

async function renderUpdatedDetails(req, res) {
    try {
        const result = await employeeDetailsServices.getEmployeeUpdatedDetails(req)
        if (result['status'] == 200) {
            res.status(200).send({
                'message': 'updated Successfully'
            })
        } else {
            res.status(result.status).send(result)
        }
    } catch (error) {

    }
}

async function renderAfterRemovedDetails(req, res) {
    try {
        const parsedData = await Employee.find()
        res.render('pages/removeEmployee', {parsedData})
    } catch (error) {

    }
}

async function removeEmployee(req, res) {
    try {
        const result =await employeeDetailsServices.getRemoveEmployee(req)
        if (result['status'] == 200) {
            res.status(200).send({
                'message': 'updated Successfully'
            })
        }
    } catch (error) {

    }
}

function readDetailspage(req, res){
    try {
        res.render('pages/addEmployee')
    } catch (error) {
        
    }
}

async function addEmployee(req, res){
    try {
        const result = await employeeDetailsServices.addNewEployeeDetails(req)
        res.status(result['status']).send(result['message'])
    } catch (error) {
        console.log(error)
    }
}

function getAllDepartments(req, res){
    try {
        Department.find().then((doc)=>{
            res.send(doc);
        }).catch((err)=>{

        });
    } catch (error) {
        
    }
}

function loginPage(req, res){
    try {
        res.status(200).render('pages/login')
    } catch (error) {
        
    }
}

async function createJwtToken(req, res){
    const result = await employeeDetailsServices.authLoginDetails(req)
    const loginDetails = req.body
    if(result['status'] == 200){
        localStorage.setItem("jwtToken", JSON.stringify(loginDetails))
        res.status(result['status']).send(result['message'])
    }else{
        console.log(result['message'])
        res.status(result['status']).send(result['message'])
    }
    
}

function removeJwtToken(req, res){
    res.render('pages/logout')
}


module.exports = {
    header,
    allEmployees,
    getEmployee,
    singleEmployeeDetails,
    renderUpdatedDetails,
    renderAfterRemovedDetails,
    removeEmployee,
    readDetailspage,
    addEmployee,
    getAllDepartments,
    loginPage,
    createJwtToken,
    removeJwtToken
}