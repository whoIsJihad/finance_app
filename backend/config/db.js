const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config()

const connectDB=async ()=>{
    try{
    await mongoose.connect(process.env.mongo_uri,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    });

    console.log('mongodb connected')
    }
    catch(e){
        console.log(e.message)
    }
}
module.exports=connectDB