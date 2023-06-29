const express = require('express');
const app = express();

const {products} = require('./data.js')

app.get('/', (req,res) => {
    res.send('<h1> Home page </h1> <a href="/api/products">products</a>')
})

app.get('/api/products', (req,res) => {
    const newProducts = products.map((product) => {
        const {id, name, image} = product;
        return {id, name, image}
    })
    res.json(newProducts)
})

app.get('/api/products/:productID', (req,res) => {
    //console.log(req);
    //console.log(req.params)
    const {productID} = req.params
    const singleProduct = products.find((product) => product.id === Number(productID))
    if (!singleProduct){
        return res.status(400).send('Product does not exist')
    }
    return res.json(singleProduct)
})

app.get('/api/products/:productID/reviews/:reviewID', (req,res) => {
    console.log(req.params)
    res.send('hello world')
})

app.listen(4500, () => {
    console.log('server is listening on port 4500 ...')

})