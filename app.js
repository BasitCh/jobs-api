require('dotenv').config()
const connectDb = require('./db/connect')
const express = require('express')
const app = express()

const notFoundMiddleWare = require('./middleware/not-found')
const errorHandlerMiddleWare = require('./middleware/error-handler')
const authRouter = require('./routes/auth')
const jobsRouter = require('./routes/job')

app.get('/', (req, res) => {
    res.send("<h1>Jobs Api</h1> ")
})

app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/jobs', jobsRouter)
app.use(notFoundMiddleWare)
app.use(errorHandlerMiddleWare)


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