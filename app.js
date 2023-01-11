const express = require('express')
const app = express()
require('dotenv').config()

// Security pack
const xss = require('xss-clean')
const helmet = require('helmet')
const cors = require('cors')
const rateLimit = require('express-rate-limit')
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use(xss())

// Options

// Connect DataBase
const connectDB = require('./db/connect')

// Middlewares
const authorizationMiddleware = require('./middleware/authentication')

// Connecting routers
const authRouter = require('./routes/auth')
const ordersRouter = require('./routes/orders')
const createOrder = require('./routes/createOrder')

// Using routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/orders', authorizationMiddleware, ordersRouter)
app.use('/api/v1/create', createOrder)

// Using security packs
app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  }))


// Running server
const port = process.env.PORT || 5000
app.set('trust proxy', 1)

app.use(express.static('./public'))

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.log(error)
    }
}

start()