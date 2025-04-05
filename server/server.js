// const express = require('express')
// const app = express()
// const router = require("./routes/auth")
// const connectDB = require("./database/dbconnect")
// const cors = require("cors")
// const appointmentsRouter = require("./routes/appoint-router")

// connectDB()

// const corsOptions = {
//     // origin: "http://localhost:3000",
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


// const PORT = 3005

// app.listen(PORT, () => {
//     console.log(`Server running at ${PORT}`)
// })

const express = require('express');
const serverless = require('serverless-http'); // For Vercel
const router = require("./routes/auth");
const connectDB = require("./database/dbconnect");
const cors = require("cors");
const appointmentsRouter = require("./routes/appoint-router");

// Initialize Express
const app = express();

// CORS Configuration (Allow your frontend)
const corsOptions = {
    origin: ["https://aal-neon.vercel.app", "http://localhost:3000"], // Your frontend URL
    methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", router);
app.use("/api/appointments", appointmentsRouter);

// Test Route
app.get("/", (req, res) => {
    res.status(200).send("Server is running 🚀");
});

// Connect to DB (works in both local & Vercel)
connectDB();

// Export for Vercel Serverless
module.exports.handler = serverless(app);

// Local development (optional)
if (process.env.NODE_ENV === 'development') {
    const PORT = 3005;
    app.listen(PORT, () => {
        console.log(`Local server: http://localhost:${PORT}`);
    });
}