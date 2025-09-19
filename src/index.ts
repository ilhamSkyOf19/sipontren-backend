import express from 'express'

// dot env 
import dotenv from 'dotenv'
import newsRouter from './routes/news.route';
import path from 'path';
import { errorMiddlewate } from './middlewares/error-middleware';
import adminRoute from './routes/admin.route';
dotenv.config();



// initialization express 
const app = express();


// initialization body & form url parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// public static
app.use(express.static(path.join(__dirname, '../public')));


// cek route
app.get('/', (req, res) => {
    res.send('Hello World!')
})




// news 
app.use('/api/news', newsRouter)


// admin
app.use('/api/admin', adminRoute)



// error handler 
app.use(errorMiddlewate)



// running server 
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})
