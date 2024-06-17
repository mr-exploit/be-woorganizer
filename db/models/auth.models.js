import { query } from "../connection.js"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const modelUser = async(userId)=>{
    try {
        const user = await query(`SELECT u.id, u.Email, u.Nama, u.NO_HP, 
                                u.Kode_Pos, u.Image, ur.role FROM user u
                                INNER JOIN user_role ur ON u.Role_id = ur.id 
                                WHERE u.id=?`, userId);

        if(user.length===0) return "User not found" 

        return user
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelRegisterCheck = async(email)=>{
    try {
        const dataEmail = await query("select Email, Nama from user where Email=?", email);
        if(dataEmail.length === 1) return "Email already exist"
      
        return "Email not found"
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }

}

const modelRegister = async(email, username, password, roleid)=>{
    try {
        const data = await query("INSERT INTO user(Email, nama, Password, Role_id) VALUES (?, ?, ?, ?)", [email, username, password, roleid]);
        
        if (data && data.affectedRows === 0) {
            return { error: "Register Failed" };
        }
        
        if (data && data.affectedRows === 1) {
            return { email, username };
        }
          
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        if (error.code === 'ER_DUP_ENTRY') {
            return { error: "Email already exists" };
        }
      
        return "Terjadi kesalahan di db"
    }
}

export {modelUser, modelRegisterCheck, modelRegister}