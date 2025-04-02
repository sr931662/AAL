const jwt = require("jsonwebtoken")

const User = require("../database/userSchema")

const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")

    if (!token) {
        return res.status(401).json({ message : "Unauthorized HTTP, Token not provided" })
    }

    const jwtToken = token.replace("Bearer", "").trim()

    try {
        const isVerified = jwt.verify(jwtToken, process.env.SECRET_KEY)
        // console.log(isVerified)

        const userData = await User.findOne({email: isVerified.email}).select({
            pass: 0,
            repass: 0,
            tokens: 0
        })
        console.log(userData);

        req.user = userData
        req.token = token
        req.userId = userData._id

        next()

    } catch (error) {
        return res.status(401).json({ msg : "Unauthorized. Invalid Token"})
        
    }
}


module.exports = authMiddleware