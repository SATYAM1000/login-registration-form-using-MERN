const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            let l=value.length;
            if(l<8){
                throw new Error('Password length <8')
            }

        }
    }

})

userSchema.pre("save", async function(next){
    //const passwordHash=await bcrypt.hash(this.password, 10);
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password, 10);
    }
    next()
} )



const User=new mongoose.model('User', userSchema);
module.exports=User;

