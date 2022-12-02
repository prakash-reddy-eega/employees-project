const router = require('express').Router()

const employeeDetailsController = require('../controllers/employeesDetails.controller')
const { empDetailsUpdationValidation, checkEmplIdValidation, empDetailsAddingValidation } = require('../validations/validations')
const {jwtTokenValidation} = require('../validations/jwtTokenValidation')

/* GET HEADER */
router.get('/', employeeDetailsController.header)

/* GET ALL EMPLOYEES */
router.get('/employees/', employeeDetailsController.allEmployees)

/* READ EMP ID TO GET SINGLE  EMPLOYEE DETAILS*/
router.get('/get_employee/',checkEmplIdValidation, employeeDetailsController.getEmployee)
// 
/* GET SINGLE EMPLOYEE DETAILS */
router.get('/employees/emp_id/',checkEmplIdValidation,  employeeDetailsController.singleEmployeeDetails)

/*UPDATE EMPLOYEE DETAILA */
router.put('/employees/employe/:emp_unq_id/',jwtTokenValidation,empDetailsUpdationValidation,employeeDetailsController.renderUpdatedDetails);

/* GET ID OF EMPLOYEE TO REMOVE PAGE*/
router.get('/remove_employee/',checkEmplIdValidation, employeeDetailsController.renderAfterRemovedDetails)


/* REMOVE EMPLOYEE*/
router.delete('/employees/:emp_unq_id',jwtTokenValidation,checkEmplIdValidation, employeeDetailsController.removeEmployee)

/* READ EMPLOYEE DETAILS TO ADD EMPLOYEE PAGE */
router.get('/add_employee',checkEmplIdValidation, employeeDetailsController.readDetailspage)

/*ADD EMPLOYEE*/
router.post('/employees/',jwtTokenValidation,empDetailsAddingValidation, employeeDetailsController.addEmployee)

router.get('/departments', employeeDetailsController.getAllDepartments)

//Login page
router.get('/login', employeeDetailsController.loginPage)

//Creating Jwt Token
router.post('/login/authorization', employeeDetailsController.createJwtToken )

//Logout Removing Jwt token

router.get('/logout', employeeDetailsController.removeJwtToken)


module.exports = router