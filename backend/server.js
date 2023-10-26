const express= require('express');
const connectToMongoDB=require('./db/connection.js');
const cors=require('cors')
const User=require('./db/user.js')
const app=express();
const bcrypt=require('bcryptjs');
const PORT=3001
app.use(express.json());
app.use(cors());

connectToMongoDB();

//--------------------registration of user---------------------
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Add await here
        res.status(200).send(users);
    } catch (error) {
        console.log("User registration failed...", error);
        res.status(500).json({ message: "Internal Server error" });
    }
});


app.post('/register', async(req,res)=>{
    try {
        const {username, password}=req.body;
        const user=new User({username, password});

//use middle ware to hash the password------------------------


        await user.save();
        res.status(201).json({message:"User registration successfull..."})        
    } catch (error) {
        console.log("User registration failed...", error)
        res.status(500).json({message:"Internal Server error"});
        
    }
})

//login user----------------------------------

app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            res.status(401).json({ message: "Invalid details provided..." });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password); // Use await here

        if (isMatch) {
            console.log("login successfull....")
            res.status(200).json({ message: "Login successful..." });
        } else {
            res.status(401).json({ message: "Invalid credentials provided..." });
        }

    } catch (error) {
        console.error("User login failed:", error);
        res.status(500).json({ message: "Internal Server error" });
    }
});




app.listen(PORT, ()=>{
    console.log("App is working on PORT 3001")
})