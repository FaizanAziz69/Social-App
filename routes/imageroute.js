import express from 'express';

import { getAllImages, saveImageToDatabase ,upload,likeImage, addComment} from '../controllers/imagecontroller.js';


const router = express.Router();

router.post('/upload/:userId', upload.single('media'), saveImageToDatabase);

router.get('/All',getAllImages)

router.post('/like', likeImage);
router.post('/commnet',addComment)
export default router;