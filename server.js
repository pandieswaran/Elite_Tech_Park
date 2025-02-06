import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors'

//DB Connectivity
import mongoose from 'mongoose'
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: 'local.env' }); 
const mongoURI = process.env.MONGOURI;

//Routes
import MainRouter from './routes/Main_Routes.js'

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
    //  origin: '*',
     origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  };

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*")
    next()
})

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log('DB Connected!', mongoURI)
}).catch((err) => {
    console.log(err)
})


app.get('/', (req, res) => {
   return res.json({Message: "Api Connected Successfully"})
});

app.use('/api', MainRouter);

app.listen(8080, () => {
    console.log('Server is listing on PORT :' + PORT);
})