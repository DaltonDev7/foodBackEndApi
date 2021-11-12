import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv"

const app = express()
createConnection()

import indexRouter from './routes/index.router'

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

//middlewares
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
dotenv.config()


//rutas
app.use('/api', indexRouter)



app.use('/', (req, res) => {
    res.json({
        'Saludo': 'Hola mundo'
    })
})


app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto : ${process.env.PORT}`);
})

