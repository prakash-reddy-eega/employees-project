const buildEnvironment = require("./src/configs/envConfig").config();
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())

//Connection to MongoDB
require("./src/configs/mongo")

app.use('/favicon.ico', (req, res)=>{
    // res.redirect(301, 'http://localhost:3000/add_employee');
    res.writeHead(200, {'Content-Type': 'image/x-icon'} );
    fs.readFile("./favicon.ico",function (err, content) {
        res.end(content);
    });
})

//console.log(`You are in ${process.env.env} Environament`);

app.set('view engine', 'ejs')

app.use('/', require('./src/routes/employeesDetails.route'))

app.listen(3000, () => {
    console.log("app is running at 3000")
})