const {
    Employee
} = require("../models/")
const {
    Users
} = require('../models')
const {
    Department
} = require('../models')
const {
    Designation
} = require('../models')

const employeesData = require('./db.services')
const {
    copyFileSync
} = require("fs")
const jwt = require('jsonwebtoken')


async function employees() {
    try {
        const doc = await Employee.find()
        return doc
    } catch (error) {
        console.log(error)
    }
}

async function getEmployeeDetails(req) {
    const {
        emp_id,
        emp_unq_id
    } = req.query
    if (emp_id !== undefined) {
        const parsedId = Number(emp_id)
        // const parsedData = await Employee.find()
        let cond = {
            "emp_id": parsedId
        }
        let emp_details = await Employee.find(cond);
        // const emp_details = parsedData.filter( eachObj => eachObj['emp_id'] == emp_id)
        if (emp_details.length === 0) {
            const result = {
                message: 'Not found',
                status: 404
            }
            return result
        } else {
            const result = {
                status: 200,
                data: {
                    emp: emp_details[0]
                }
            }
            return result
        }
    } else if (emp_unq_id !== undefined) {
        // const parsedData = await Employee.find()
        const emp_details = await Employee.findOne({
            "_id": emp_unq_id
        })
        // const emp_details = parsedData.filter( eachObj => eachObj['_id'] == emp_unq_id)
        if (emp_details.length === 0) {
            const result = {
                message: 'Not found',
                status: 404
            }
            return result
        } else {
            const result = {
                status: 200,
                data: {
                    emp: emp_details
                }
            }
            return result
        }
    } else {
        const result = {
            message: 'Not found',
            status: 404
        }
        return result
    }
}


async function getEmployeeUpdatedDetails(req) {
    const emp_details = req.body
    let emp_unq_id = req.params.emp_unq_id
    let isDetailsCorrect = true

    const {
        emp_name,
        designation,
        department,
        salary,
        email_id,
        emp_id
    } = emp_details

    if (designation != undefined) {
        const designationDetails = await Designation.findOne({
            'designation': designation
        })
        if (designationDetails != null) {
            const designationObjId = designationDetails['_id']
            await Employee.updateOne({
                "_id": emp_unq_id.trim()
            }, {
                "designation": designationObjId
            })
        }else{
            isDetailsCorrect = "Invalid Destination Details"
        }

    }
    if (department != undefined) {
        const departmentDetails = await Department.findOne({
            'department': department
        })

        if(departmentDetails != null){
            const departmentObjId = departmentDetails['_id']
        await Employee.updateOne({
            "_id": emp_unq_id.trim()
        }, {
            "department": departmentObjId
        })
        }else {
            isDetailsCorrect = 'Invalid Department Details'
        }

        
    }

    if (emp_name != undefined) {

        await Employee.updateOne({
            "_id": emp_unq_id.trim()
        }, {
            "emp_name": emp_name
        })
    }
    if (salary != undefined) {
        await Employee.updateOne({
            "_id": emp_unq_id.trim()
        }, {
            "salary": salary
        })
    }
    if (email_id != undefined) {
        await Employee.updateOne({
            "_id": emp_unq_id.trim()
        }, {
            "email_id": email_id
        })
    }
    if (emp_id != undefined) {
        await Employee.updateOne({
            "_id": emp_unq_id.trim()
        }, {
            "emp_id": emp_id
        })
    }


    // parsedData.map( eachObj => {
    //     if (eachObj['emp_id'] == emp_id){
    //         if( emp_name !== undefined){
    //             eachObj['emp_name'] = emp_name
    //         }
    //         if( designation !== undefined){
    //             eachObj['designation'] = designation
    //         }
    //         if( department !== undefined){
    //             eachObj['department'] = department
    //         }
    //         if( salary !== undefined){
    //             eachObj['salary'] = salary
    //         }
    //         if( email_id !== undefined){
    //             eachObj['email_id'] = email_id
    //         }
    //     }
    // })
    // await Employee.remove()
    // await Employee.insertMany(parsedData)
    if (isDetailsCorrect === true){
        const result = {
            message: 'Updated successfully',
            status: 200
        }
        return result
    }else{
        const result = {
            message: isDetailsCorrect,
            status: 400
        }
        return result
    }
    
}

async function getRemoveEmployee(request) {
    const {
        emp_unq_id
    } = request.params
    const employeeDetails = await Employee.find({
        "_id": emp_unq_id
    })

    // const parsedData = JSON.parse(employeesDetails)
    // const isObjInarr = parsedData.some( eachObj => eachObj['emp_id'] == emp_id)

    if (employeeDetails.length > 0) {
        await Employee.deleteOne({
            "_id": emp_unq_id.trim()
        })
        const result = {
            message: 'Removed Successfully',
            status: 200
        }
        return result
    } else {
        const result = {
            message: 'Not found',
            status: 404
        }
        return result
    }
}

async function addNewEployeeDetails(request) {
    return new Promise(async (resolve, reject) => {
        let result = {
            message: '',
            status: ''
        }
        const emp_details = request.body;
        const {
            designation,
            department
        } = emp_details
        const designationDetails = await Designation.findOne({
            'designation': designation
        })
        if(designationDetails != null){
            const designationObjId = designationDetails['_id']
            emp_details['designation'] = designationObjId
        }

        const departmentDetails = await Department.findOne({
            'department': department
        })
        if(departmentDetails != null){
            const departmentObjId = departmentDetails['_id']
            emp_details['department'] = departmentObjId
        }


    console.log("uuuuuuuuuuuuuuyyyyyyyyyyyyyy ^^^^^")

        // const {emp_id} = emp_details
        Employee.insertMany([emp_details], (err) => {
            if (err) {
                result['message'] = err._message
                result['status'] = 400
                resolve(result);
            } else {
                result['message'] = "Successfully Added"
                result['status'] = 201
                resolve(result);
            }
        })
    });
}

async function authLoginDetails(req) {
    const dbUserDetails = await Users.find()
    const loginDetails = req.body
    if (dbUserDetails[0]['username'] == loginDetails['username']) {
        if (dbUserDetails[0]['password'] == loginDetails['password']) {
            const payload = {
                username: loginDetails['username']
            }
            const token = jwt.sign(payload, 'my_jwt_token')
            return {
                message: token,
                status: 200
            }
        } else {
            return {
                message: "password did't match",
                status: 400
            }
        }
    } else {
        return {
            message: "username didn't match",
            status: 400
        }
    }
}

module.exports = {
    employees,
    getEmployeeDetails,
    getEmployeeUpdatedDetails,
    getRemoveEmployee,
    addNewEployeeDetails,
    authLoginDetails
}