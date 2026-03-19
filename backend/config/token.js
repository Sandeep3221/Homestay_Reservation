import jwt from "jsonwebtoken"

const genToken = (userId) => {
    if (!userId) {
        throw new Error("userId is required to generate a token")
    }
    try {
        const token = jwt.sign({ userId },process.env.JWT_SECRET,{ expiresIn: "7d" }
        )
        return token
    } catch (error) {
        console.error("Error generating token:", error.message)
        throw new Error("Failed to generate authentication token")
    }
}

export default genToken