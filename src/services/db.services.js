fs = require('fs')

const employeesDdata =  fs.readFileSync('employees_data.json', 'utf-8', (err, data) => {
    return data
}) 

module.exports = employeesDdata