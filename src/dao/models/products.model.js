const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productsCollection = 'products'
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    code:{
        type:String,
        require:true
    },
    price:{
        type:String,
        require:true
    },
    status:{
       type:Boolean
    },
    stock:{
        type:Number,
        default: 0
    },
    category:{
        type:String,
        require:true,
    },
    thumbnail:{
        type:String
    }


})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productsCollection, productSchema);

module.exports = productModel;