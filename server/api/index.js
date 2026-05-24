import app from "../server.js"
import connectDB from "../config/db.js"

try {
  await connectDB()
} catch (error) {
  console.error("STARTUP ERROR:", error)
}

export default app