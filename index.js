import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { testConnection} from './db/connection.js'
import router from './routes/index.js'
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Konfigurasi untuk ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express()
dotenv.config()
const port = process.env.PORT;
app.use(cors())
app.use(express.json())


// Serving static files (uploaded images)
app.use('/uploads/interior-img/', express.static(path.join(__dirname, 'uploads', 'interior-img')));
app.use('/uploads/user-img', express.static(path.join(__dirname, 'uploads', 'user-img')));
app.use('/uploads/dress-img', express.static(path.join(__dirname, 'uploads', 'dress-img')));


app.use(express.urlencoded({ extended: true}));
app.use(cors({
    credentials: true,
    origin: process.env.KEY_ORIGIN
}));


app.use(router);

// endpoint tes
app.get("/", (req, res) => {
    res.send("hallo sir/miss, welcome you have successfully run this endpoint");
});


app.listen(port, function() {
    testConnection()
    console.log(`Your application is running on the port http://localhost:${port}`);
})