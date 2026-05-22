import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import multer from 'multer'

import connectDB from './config/db.js'

import authRouter from './routes/authRoutes.js'
import employeesRouter from './routes/employeeRoutes.js'
import profileRouter from './routes/profileRoutes.js'
import attendanceRouter from './routes/attendanceRoutes.js'
import LeaveRouter from './routes/leaveRoutes.js'
import payslipRouter from './routes/payslipRoutes.js'
import dashboardRouter from './routes/dashboardRoutes.js'

import { serve } from "inngest/express"
import { inngest, functions } from './inngest/index.js'

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(multer().none())

// DB Connection
connectDB().catch(console.error)

// Routes
app.get('/', (req, res) => {
    res.send("Server is running")
})

app.use("/api/auth", authRouter)
app.use("/api/employees", employeesRouter)
app.use("/api/profile", profileRouter)
app.use("/api/attendance", attendanceRouter)
app.use("/api/leave", LeaveRouter)
app.use("/api/payslips", payslipRouter)
app.use("/api/dashboard", dashboardRouter)

// Inngest
app.use("/api/inngest", serve({
    client: inngest,
    functions
}))

export default app