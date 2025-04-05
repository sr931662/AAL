// const express = require("express")
// const mongoose = require("mongoose")
// const dotenv = require("dotenv")
// dotenv.config({ path:'./config.env' })

// const DB = process.env.MONGO_URI + 'AAL?retryWrites=true&w=majority'

// const PORT = process.env.PORT

// const connectDB = async () => {
//     try {
//         await mongoose.connect(DB)
//         console.log("Database connected !!!")
        
//     }
//     catch (err) {
//         console.error(err)
//         process.exit(0)
//     }
// }
// module.exports = connectDB




const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({ path: './config.env' })

const DB = process.env.MONGO_URI + 'AAL?retryWrites=true&w=majority'

// Cache the connection to handle serverless cold starts
let cachedDb = null

const connectDB = async () => {
    if (cachedDb && mongoose.connection.readyState === 1) {
        console.log("Using existing database connection")
        return cachedDb
    }

    try {
        // Add these options for better connection handling
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000
        }

        const connection = await mongoose.connect(DB, options)
        console.log("Database connected !!!")
        cachedDb = connection
        return connection
    } catch (err) {
        console.error("Database connection error:", err)
        // Don't exit process in serverless environment
        throw err // Rethrow to be caught by calling function
    }
}

module.exports = connectDB