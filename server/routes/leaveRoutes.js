import {Router} from "express"
import { createLeave, getLeaves, updateLeaveStatus } from "../controllers/leaveController.js"
import { protect, protectAdmin } from "../middleware/auth.js"

const LeaveRouter = Router()

LeaveRouter.post("/", protect, createLeave)
LeaveRouter.get("/", protect, getLeaves)
LeaveRouter.patch("/:id", protect, protectAdmin, updateLeaveStatus)

export default LeaveRouter