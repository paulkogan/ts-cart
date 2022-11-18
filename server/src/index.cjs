const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const port = 3001
const app = express();

//const {MOCK_PRODUCTS} = require('../tests/products.cjs')
const {mockProducts} = require('../tests/products.cjs')


app.use(cors());

// appends requerst to req.body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())


// create temorary catalog
let catalog = mockProducts

app.get('/', (req, res) => {
    res.send("I am gROXXOT")
});

app.get('/products', (req, res) => {

    res.send(catalog)
});



app.listen(port, () => console.log(`TS-Cart API listening on port ${port}!`))

