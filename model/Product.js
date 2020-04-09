const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
img:{
    type:String,
    default:"hi"
},
category:{
    type:String,
    required:true
},
title:{
    type:String,
    required:true
},
description:{
    type:String,
    required:true
},
price:{
    type:Number,
    required:true
},
productOn:{
    type:String,
     default:'noWhere'
},
quantity:{
    type:Number,
    required:true
    
},
dateOfOrder:{
    type:Date,
    default:Date.now()
}
});

const productModel=mongoose.model('Product',productSchema);
module.exports=productModel;