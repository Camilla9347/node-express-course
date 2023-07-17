const product = require('../models/product')
const Product = require('../models/product')

const getAllProductsStatic = async (req,res) => {
    //throw new Error('testing async errors')
    const products = await Product.find({price:{$gt:30}})
    .sort('price')
    .select('name price')
    res.status(200).json({products, nbHits:products.length})
}

const getAllProducts  = async (req,res) => {
    const {featured, company, name, sort, fields, numericFilters} = req.query //all filters
    const queryObject = {} //to eliminate unwanted staff
    if(featured){
        queryObject.featured = featured === 'true'? true : false 
    }
    if(company){
        queryObject.company = company
    }
    if (name){ //i nomi hanno gli spazi normali invece
        queryObject.name = {$regex:name, $options: 'i'}
    }

    if(numericFilters){
        const operatorMap = {
            '>':'$gt',
            '>=':'$gte',
            '=':'$eq',
            '<':'$lt',
            '<=':'$lte'
        }
        const regEx = /\b(<|>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        const options = ['price', 'rating'];
        filters = filters.split(',').forEach((item) => {
            const [field,operator,value] = item.split('-')
            if(options.includes(field)){
                queryObject[field] = {[operator]:Number(value)}
            }
        });
    }
    console.log(queryObject)
    // sort and fields
    let result = Product.find(queryObject) 
    // no await lo modifico! i filtri si possono applicare in contemporanea
    // se decido di aspettare qui aspetto a vita!
    if(sort){
        const sortList = sort.split(',').join(' '); // io utilizzo le virgole nel browser
        result = result.sort(sortList)
    } else {
        result = result.sort('createdAt')
    }
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        result = result.select(fieldsList)
    }
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page -1) * limit;

    result = result.skip(skip).limit(limit)
    // 23
    // 4 pages 7 7 7 2

    const products = await result 
    // ora aspetto che tutti i filtri siano applicati, alla fine!
    res.status(200).json({products, nbHits:products.length})
}

module.exports = {
    getAllProductsStatic,
    getAllProducts
}