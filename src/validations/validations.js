const {
    check,
    validationResult
} = require('express-validator');
const {
    validateResult
} = require("./val");

const empDetailsUpdationValidation = [
    check("emp_name")
    .optional()
    .isString()
    .withMessage("Invalid"),
    check("designation")
    .optional()
    .isString()
    .withMessage("Invalid"),
    check("emp_id")
    .optional()
    .isInt()
    .withMessage("Invalid"),
    check("department")
    .optional()
    .isString()
    .withMessage("Invalid"),
    check("salary")
    .optional()
    .isString()
    .withMessage("Invalid"),
    check("email_id")
    .optional()
    .isEmail()
    .withMessage("Invalid"),
    (req, res, next) => {
        validateResult(req, res, next)
    },
];

const checkEmplIdValidation = [
    check("emp_id").isInt().optional().withMessage("Please Provide An Integer ------"),
    check("emp_unq_id").isMongoId().optional().withMessage("Please Provide An mongoId"),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            return res.status(400).json({
                error: error.array()
            });
        }
    }

]


const empDetailsAddingValidation = [
    check("emp_name")
    .notEmpty()
    .isString()
    .withMessage("Emplooyee name should be string and non empty"),
    check("designation")
    .notEmpty()
    .isString()
    .withMessage("Designation should be mongodb id and non empty"),
    check("emp_id")
    .notEmpty()
    .isInt()
    .withMessage("Emplooyee Id should be Integer and non empty"),
    check("department")
    .notEmpty()
    .isString()
    .withMessage("Department should be  mongodb id and non empty"),
    check("salary")
    .notEmpty()
    .isString()
    .withMessage("Salary be string and non empty"),
    check("email_id")
    .notEmpty()
    .isEmail()
    .withMessage("Require valid mail id"),
    (req, res, next) => {
        try {
            validationResult(req).throw();
            return next();
        } catch (error) {
            return res.status(400).json({
                error: error.array()
            });
        }
    }
];


module.exports = {
    empDetailsUpdationValidation,
    checkEmplIdValidation,
    empDetailsAddingValidation
};