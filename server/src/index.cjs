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
//let catalog = []
let catalog = mockProducts
// let item = {
//     "id": "f677ac89-c82c-4d97-b057-010d98ea439f",
//     "name": "plane",
//     "price": 6.88,
//     "imageURL": "https://m.media-amazon.com/images/I/61IB1hj+ZfL._AC_SL1500_.jpg",
// }
// catalog.push(item)

app.get('/', (req, res) => {
    res.send("I am gROOT")
});

app.get('/products', (req, res) => {

    res.send(catalog)
});



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))

// module.exports = {
//     getDatabase,
//     startDatabase,
// };