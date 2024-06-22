import { query } from "../connection.js"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const modelUserProfile = async(userId)=>{
    try {
        const result = await query(`SELECT u.id, u.Email, u.Nama, u.No_HP, 
                                u.Kode_Pos, u.Image, ur.role as role FROM user u
                                INNER JOIN user_role ur ON u.Role_Id = ur.id 
                                WHERE u.id=? `, userId);
                                
        if(result.length===0) return "User tidak ditemukan" 

        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelGetUserId = async(userId)=>{
    try {
        const result = await query(`SELECT Email, Nama, No_HP, Kode_Pos,Image FROM user  
                                WHERE id=?`, userId);
        if(result.length===0) return "User tidak ditemukan" 

        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelUserId = async(userId)=>{
    try {
        const result = await query(`SELECT id, Image FROM user  
                                WHERE id=?`, userId);
        console.log("check result", result)
        if(result.length===0) return "User tidak ditemukan" 

        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelResetPasswordUser = async(password, id)=>{
    try {
        const data = await query("UPDATE user SET Password= ? where id =?", [password, id]);
        return data;
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}
const modelUpdateUserRole = async(id, Role_id)=>{
    try {

        const data = await query("UPDATE user SET Role_id = ? where id =?", [Role_id, id]);

        if(data === undefined){
            return "Gagal Update data"
        }  

        return data;

    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelUpdateProfile = async(id, nama, no_hp, kode_pos, image)=>{
    try {
        const data = await query("UPDATE user SET Nama= ?, No_HP = ?, Kode_Pos =?, Image=? where id =?", [nama, no_hp, kode_pos, image, id]);
     
        if(data.affectedRows===1){
            const result = {
                nama,
                no_hp,
                kode_pos,
                image
            } 
            return result;
        }
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const checkresult = async(id) =>{
    try {
        const result = await query("SELECT id, Email,Nama, Password FROM user WHERE id = ?", [id]);
        if(result.length === 0){
            return "User tidak ditemukan"
        }
        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
 
}

const modelDeleteUser = async(id)=>{
    try {
        const result = await query("DELETE FROM user WHERE id = ?", [id]);
        
        return result;
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

export { 
    modelUserProfile, modelUpdateUserRole, modelGetUserId, modelResetPasswordUser, modelUserId, checkresult,
    modelUpdateProfile, modelDeleteUser
}