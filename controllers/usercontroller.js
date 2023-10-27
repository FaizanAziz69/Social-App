import UserModel from '../model/user.js'; 
import jwt from 'jsonwebtoken';

const registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

    
       
        const newUser = new UserModel({
            username,
            password
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'User registration failed' });
    }
};

export { registerUser };



const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

 
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

    
        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }


        const token = jwt.sign({ userId: user._id }, 'your_secret_key');

        res.status(200).json({ message: 'User logged in successfully', token,user });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ message: 'User login failed' });
    }
};

export { loginUser };

export const allusers = async(req,res)=>{
    try{
    const users = await UserModel.find()
    res.json(users)
}catch(err){
res.json(err)
}
}