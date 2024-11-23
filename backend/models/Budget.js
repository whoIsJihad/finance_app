const mongoose=require('mongoose')

const BudgetSchema= new mongoose.Schema({
    category:{
        type:String,
        required:true,
        trim:true,
    },
    limit:{
        type:Number,
        required:true,
        min:0,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
},{timestamps:true});


module.exports=mongoose.model('Budget',BudgetSchema);