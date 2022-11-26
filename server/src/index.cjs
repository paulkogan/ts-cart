// import * as express from 'express'
// import * as cors from 'cors'
// import * as bodyParser from 'body-parser'
// SyntaxError: Cannot use import statement outside a module



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const helmet = require('helmet');
const morgan = require('morgan');
const port = 3001
const app = express();

//const {MOCK_PRODUCTS} = require('../tests/products.cjs')
const {mockProducts} = require('../tests/products.cjs')
const db = require('../models/index.cjs')
console.log("=====================")
//console.log(db)
const User = db.users;
const Op = db.Sequelize.Op;



app.use(cors());

// appends requerst to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


// create temorary catalog
let catalog = mockProducts

app.get('/', (req, res) => {
    res.send("I am gROXXOT")
});


app.get('/db', async (req, res) => {

    try {
        const response = await db.sequelize.authenticate()
        console.log(`Connection has been established successfully. ${response}`)
        res.send(`OK Sequalize ${response}`)

        
      } catch (error) {
        console.error('Unable to connect to the database:', error);
        res.send(`NOT OK Sequalize ${error}`)
      }
});

app.post('/login/find_user', async (req, res) => {
    var target_email = req.body.email;
    console.log(`User target_email is ${target_email}`)
    const user_email_param = req.params.email;

    User.findByEmail(target_email)
    .then(data => {
        if (data) {
            console.log(`Found user ${data}`)
            res.send(data);
        } else {
            console.log(`Did not find user with  ${target_email}`)
            res.status(404).send({
                message: `Did not find user with  ${target_email}`
              });
        }

    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while finding User by email"
        });
    });


})




app.get('/users', async (req, res) => {

    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    User.findAll({ where: condition })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving users."
        });
    });
})



app.get('/products', (req, res) => {

    res.send(catalog)
});



app.listen(port, () => console.log(`TS-Cart API listening on port ${port}!`))

