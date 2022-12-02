const {validationResult} = require("express-validator")

exports.validateResult = (req, res, next) => {
    try {
        validationResult(req).throw();
        return next();
    } catch (error) {
        return res.status(400).json({error: error.array()});
    }
}