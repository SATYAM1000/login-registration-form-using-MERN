const mongoose=require('mongoose');

const connectToMongoDB= async()=>{
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/registration_form')
        console.log("Database connection successfull...")
        
    } catch (error) {
        console.log("Database connection failed...")
        
    }
}

module.exports=connectToMongoDB;