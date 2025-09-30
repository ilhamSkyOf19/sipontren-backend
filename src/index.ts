import express from 'express'

// dot env 
import dotenv from 'dotenv'
import newsRouter from './routes/news.route';
import path from 'path';
import { errorMiddlewate } from './middlewares/error-middleware';
import adminRoute from './routes/admin.route';
dotenv.config();
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route';
import cors from 'cors';
import ustadRoute from './routes/ustad.route';
import studentRouter from './routes/student.route';


// initialization express 
const app = express();


// cord
app.use(cors({
    origin: ["http://localhost:5173", "https://31fbfbe1d62b.ngrok-free.app"], // base url front end
    credentials: true, // biar cookie / Authorization header ikut
}));

// initialization cookie 
app.use(cookieParser());


// initialization body & form url parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public static
app.use(express.static(path.join(__dirname, '../public')));


// cek route
app.get('/', (req, res) => {
    res.send('Hello World!')
})



// auth
app.use('/api/auth', authRouter)



// news 
app.use('/api/news', newsRouter)


// admin
app.use('/api/admin', adminRoute)


// ustad
app.use('/api/ustad', ustadRoute)

// student
app.use('/api/student', studentRouter)


// error handler 
app.use(errorMiddlewate)



// running server 
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})
