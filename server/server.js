// // const express = require('express')
// // const app = express()
// // const router = require("./routes/auth")
// // const connectDB = require("./database/dbconnect")
// // const cors = require("cors")
// // const appointmentsRouter = require("./routes/appoint-router")

// // connectDB()

// // const corsOptions = {
// //     // origin: "http://localhost:3000",
// //     origin: "https://aal-neon.vercel.app",
// //     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
// //     credentials: true,
// // };

// // app.use(cors(corsOptions))
// // app.use(express.json())
// // app.use(express.urlencoded({ extended: true }));
// // app.use("/api/auth", router)
// // app.use("/api/appointments", appointmentsRouter);


// // app.get("/", (req, res) => {
// //     res.status(200).send('Home page')
// // })

// // app.get("/login", (req, res) => {
// //     res.status(200).send('Login page')
// // })

// // app.get("/sign-up", (req, res) => {
// //     console.log(req.body)
// // })

// // app.get("/send-email", (req, res) => {
// //     res.status(200).send("Send Mail")
// // })


// // const PORT = 3005

// // app.listen(PORT, () => {
// //     console.log(`Server running at ${PORT}`)
// // })

// const express = require('express')
// const app = express()
// const router = require("./routes/auth")
// const connectDB = require("./database/dbconnect")
// const cors = require("cors")
// const appointmentsRouter = require("./routes/appoint-router")
// const serverless = require('serverless-http') // Add this

// connectDB()

// const corsOptions = {
//     origin: "https://aal-neon.vercel.app",
//     methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
//     credentials: true,
// };

// app.use(cors(corsOptions))
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
// app.use("/api/auth", router)
// app.use("/api/appointments", appointmentsRouter);

// app.get("/", (req, res) => {
//     res.status(200).send('Home page')
// })

// app.get("/login", (req, res) => {
//     res.status(200).send('Login page')
// })

// app.get("/sign-up", (req, res) => {
//     console.log(req.body)
// })

// app.get("/send-email", (req, res) => {
//     res.status(200).send("Send Mail")
// })

// // Comment out the regular app.listen
// // const PORT = 3005
// // app.listen(PORT, () => {
// //     console.log(`Server running at ${PORT}`)
// // })

// module.exports.handler = serverless(app); // Add this for Vercel


//   // "scripts": {
//     // "start": "nodemon server.js",
//     // "test": "echo \"Error: no test specified\" && exit 1"
//   // },







const express = require('express')
const app = express()
const router = require("./routes/auth")
const connectDB = require("./database/dbconnect")
const cors = require("cors")
const appointmentsRouter = require("./routes/appoint-router")
const serverless = require('serverless-http')

// Initialize database connection when Lambda starts
let dbInitialized = false

const initDB = async () => {
    if (!dbInitialized) {
        try {
            await connectDB()
            dbInitialized = true
        } catch (err) {
            console.error("Initial DB connection failed:", err)
        }
    }
}

// Initialize immediately in case of warm start
initDB()

const corsOptions = {
    origin: "https://aal-neon.vercel.app",
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.get('/health', async (req, res) => {
    try {
        await mongoose.connection.db.admin().ping()
        res.status(200).json({ status: 'OK', db: 'connected' })
    } catch (err) {
        res.status(500).json({ status: 'DOWN', db: 'disconnected' })
    }
})
// Add middleware to ensure DB connection for each request
app.use(async (req, res, next) => {
    try {
        await initDB()
        next()
    } catch (err) {
        console.error("DB connection in middleware failed:", err)
        res.status(500).json({ error: "Database connection failed" })
    }
})

app.use("/api/auth", router)
app.use("/api/appointments", appointmentsRouter)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("Server error:", err)
    res.status(500).json({ error: "Internal server error" })
})

module.exports.handler = serverless(app)