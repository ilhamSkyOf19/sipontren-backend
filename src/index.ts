import express from 'express'

// dot env 
import dotenv from 'dotenv'
dotenv.config();



// initialization express 
const app = express();


// initialization body & form url parser 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// cek route
app.get('/', (req, res) => {
    res.send('Hello World!')
})


// running server 
app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
})
