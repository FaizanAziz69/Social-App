import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './db/db.js'
import imagerouter from './routes/imageroute.js';
import userrouter from './routes/userroute.js'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname,join } from 'path';
import {v2 as cloudinary} from 'cloudinary';
const app = express()
connectDB()




app.use(cors({origin:"http://localhost:3000"}))

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PORT = 5000; 

app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/image',imagerouter)
app.use('/uploads', express.static(join(__dirname, 'uploads')));
app.use('/user',userrouter)



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.listen(PORT, ()=>console.log(`the Server is ruuning on port:http://localhost${PORT}`))
app.get('/',(req,res)=>{
res.send("Hello ")
})