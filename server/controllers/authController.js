import User from "../models/User"


//Login employee and admin POST(/api/auth/login)
export const login = async(req, res)=>{
    try {
        const {email, password, role_type} = req.body
        if(!email || !password){
            return res.status(400).json({error: "Email and password are required"})
        }
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({error : "Invalid credentials" })
        }
        if(role_type === "admin" && user.role !== "ADMIN"){
            return res.status(401).json({error: "Not authorized as admin"})
        }
        if(role_type === "empployee" && user.role !== "EMPLOYEE"){
            return res.status(401).json({error: "Not authorized as employee"})
        }


    } catch (error) {
        
    }
}
