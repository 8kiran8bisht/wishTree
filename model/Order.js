const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
userid:{
    type:String,
    default:''
},
img:{
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
    type:String,
    required:true
},
quantity:{
    type:Number,
    default:1
},
dateOfOrder:{
    type:Date,
    default:Date.now()
},
status:{
    type:Number,
    default:1
}

});

const orderModel=mongoose.model('Order',orderSchema);
module.exports=orderModel;