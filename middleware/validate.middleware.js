import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { modelUser } from '../db/models/auth.models.js'

dotenv.config()

const authenticateToken = (req,res,next)=>{
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader&& authHeader.split(" ")[1]
        if(!token) return res.sendStatus(401)
        jwt.verify(token, process.env.SECRETKEY, (err, decoded, user)=>{
            if(err) return res.status(403).json({msg: "forbiden", status:403})
            const userrole = req.user=decoded;
            next()    
        })
    } catch (error) {
        console.log("error")
        return "terjadi error di server"
    }
    
}

const adminRole = async(req,res,next)=>{
    try {
        const { sub: id } = req.user;
        if(!id) return res.status(401).json({msg: "forbiden", status:401})
        const user = await modelUser(id);
        const role = user[0].role;
        if(role !== "admin") return res.status(403).json({msg: "Akses Denied", status:403})
        next()
    } catch (error) {
        console.log("check error", error)
        return "terjadi error di server"
    }
   
} 

const userRole = async(req,res,next)=>{
    try {
        const { sub: id } = req.user;
        if(!id) return res.status(401).json({msg: "forbiden", status:401})
        const user = await modelUser(id);
        const role = user[0].role;
        if(role !== "user") return res.status(403).json({msg: "Akses Denied", status:403})
        next()
    } catch (error) {
        console.log("check error", error)
        return "terjadi error di server"
    }
    
} 

export {authenticateToken, adminRole ,userRole}