require('dotenv').config()
const connectDb = require('./db/connect')
const express = require('express')
const app = express()


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDb(process.env.MONGO_URI)
        app.listen(port, ()=> {
            console.log(`server is listening on PORT ${port}`)
        })
    } catch (err) {
        console.log(err)
    }
}

start()