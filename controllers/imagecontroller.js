import Image from "../model/image.js";
import multer from "multer";
import path from "path";
import UserModel from "../model/user.js";
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    cb(null, `image-${uniqueSuffix}${extension}`);
  },
});

export const upload = multer({ storage });

const saveImageToDatabase = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const { mimetype, originalname } = req.file;
    const userId = req.params.userId;

    const imageUrl = `http://192.168.1.215:5000/uploads/${req.file.filename}`;
    const user = await UserModel.findById(userId);
    console.log(user, "user name");

    const newImage = new Image({
      media: originalname,
      type: mimetype,
      url: imageUrl,
      userId: userId,
      username: user.username,
    });

    await newImage.save();

    res
      .status(201)
      .json({ message: "Image uploaded and saved successfully", newImage });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ message: "Image upload failed" });
  }
};
export { saveImageToDatabase };

export const getAllImages = async (req, res) => {
  try {
    const images = await Image.find()
    
  
   
    res
      
      .status(200)
      .json({name:"umer"});
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: "Error fetching images" });
  }
};

const likeImage = async (req, res) => {
  try {
    const { userId, imageId } = req.body;

    const image = await Image.findById(imageId);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    if (image.likedBy.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User has already liked this image" });
    }

    await Image.updateOne({ _id: imageId }, { $addToSet: { likedBy: userId } });

    res.status(200).json({ message: "Image liked successfully" });
  } catch (error) {
    console.error("Error liking image:", error);
    res.status(500).json({ message: "Image like failed" });
  }
};

export { likeImage };

const addComment = async (req, res) => {
  try {
    const { userId, imageId, comment } = req.body;

    const image = await Image.findById(imageId);

    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    image.comments.push({
      userId,
      username: user.username,
      comment,
    });

    await image.save();

    res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Error adding comment" });
  }
};

export { addComment };
