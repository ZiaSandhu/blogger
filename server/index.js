const express = require('express')
const dbConnect = require('./database/index')
const errorHandle = require('./middleware/errorHandle')
const router = require('./routes/index')
const {URI}  = require('./config/index')
const {PORT}  = require('./config/index')
const {FRONTEND_URL}  = require('./config/index')
const cors = require('cors')
const app = express()

function start(){
    try {
        app.use(express.json({limit: '50mb'}))
        app.use(cors({
            origin: FRONTEND_URL,
            credentials: true
        }))
        app.use('/api',router)
        dbConnect(URI)
        app.use('/assets',express.static('assets'))
        app.use(errorHandle)

        app.listen(PORT,()=>{
            console.log(`Server is connected to port : ${PORT}`);
        })
    } catch (error) {
        console.log(error)
    }
}
start();