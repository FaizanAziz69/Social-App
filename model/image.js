import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    media: String, 
    type: String,  
    url: String,
    username:String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
   
    },
    likedBy: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }],
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'UserModel'
        
        },
        username: String,
        comment: String,
       
    }],

});

const Image = mongoose.model('Image', imageSchema);

export default Image;
