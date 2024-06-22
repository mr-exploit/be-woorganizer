
import dotenv from 'dotenv'
import { modelDeleteUser, modelResetPasswordUser, modelUpdateProfile, modelUserId, modelUserProfile } from '../db/models/user.model.js';
import bcrypt from 'bcrypt'
import path from 'path';
import fs from 'fs';

dotenv.config()

const deleteFile = async (filePath) => {
    try {
        await fs.promises.unlink(filePath);
    } catch (error) {
        console.error(`Failed to delete file at ${filePath}:`, error);
    }
};

const GetUser = async(req,res,next)=>{
    try {
        const id = req.query.id;
        const result = await modelUserProfile(id);
        console.log("check result", result)
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }else if(result === "User tidak ditemukan"){  
            return res.status(400).json({msg : `User tidak ditemukan`})
        }

        return res.status(200).json({ data : result});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetUserId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelUserId(id);
  
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }else if(result === "User tidak ditemukan"){  
            return res.status(400).json({msg : `User tidak ditemukan`})
        }
        console.log("result", result)
        return res.status(200).json({ data : result});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}


const updateUserRole = async(req,res,next)=>{
    try {
        const { Role_id } = req.body;
        const {id} = req.params;
        const userId = await modelUserId(id);
        if(!id) return res.status(400).json({msg : `id tidak ditemukan`})
            
        if(userId === "User tidak ditemukan"){
            return res.status(400).json({msg : `User tidak ditemukan`})
        }else if(userId.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        const result = await modelUserProfile(id, Role_id);

        if(result === "Update Role_id Failed"){
            return res.status(400).json({msg : `Update Role_id Failed`})
        }else if(result.error){
            return res.status(500).json({msg : `terjadi kesalahan`})
        }

        return res.status(200).json({ data : result});

    } catch (error) {
        console.log("Terjadi kesalahan server:", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})   
    }
}

const userResetPassword = async(req,res,next)=>{
    try {
    const {password, confPassword} = req.body
    const { sub: iduser } = req.user;
    const idparams = req.params;
    const userId = await modelUserId(idparams);
    console.log("userId", userId);
    if(userId === "User tidak ditemukan"){
        return res.status(400).json({msg : `User tidak ditemukan`})
    } else if (userId.error){
        return res.status(500).json({msg : `terjadi kesalahan`})
    }
    const id = userId[0].id;
    if(iduser !== id){
        return res.status(404).json({msg : `User tidak bisa edit yang bukan aksesnya`})
    }
   
    if(password===""||password===undefined||confPassword===""||confPassword===undefined){
        return res.status(400).json({error:"Field must not be empty"})
    }

    if (password!==confPassword){
        return res.status(400).json({error:"Password not match"})
    }
   
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password,salt)

        const result = await modelResetPasswordUser(hash, id);
        if(result.error){
            return res.status(400).json(result)
        }
        return res.status(200).json({ status : 200, msg :"Reset Password Success"});

    } catch (error) {
        console.log("error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }

}

const UpdateProfile = async(req,res,next)=>{
    try {
        const { nama, no_hp, kode_pos } = req.body;
        const id = req.params;
        const {sub : iduser} = req.user;
        console.log("check" , id)
         // Get the file path from Multer
         const imagePath = req.file ? req.file.path : null;

        const userId = await modelUserId(iduser);
        if(userId === "User tidak ditemukan"){
            return res.status(400).json({msg : `User tidak ditemukan`})
        } else if (userId.error){
            return res.status(500).json({msg : `terjadi kesalahan`})
        }
        if(iduser !== userId[0].id){
            return res.status(404).json({msg : `User tidak bisa edit yang bukan dirinya sendiri`})
        }
        const result = await modelUpdateProfile(userId[0].id, nama, no_hp, kode_pos, imagePath);

        const dataresult = {
            nama : nama,
            no_hp : no_hp,
            kode_pos : kode_pos,
            imagePath : imagePath
        }
        if(result.error){
            return res.status(500).json({msg : `terjadi kesalahan `})
        }
        return res.status(200).json({  msg : "Update Success", data : dataresult });
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const deleteAkun = async (req, res, next) => {
    try {
        const id = req.query.id;

        if (!id) {
            return res.status(400).json({ msg: "ID tidak diberikan" });
        }

        const userId = await modelUserId(id);
        if (userId === "User tidak ditemukan") {
            return res.status(400).json({ msg: "User tidak ditemukan" });
        }else if(userId.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }

        const filePath = userId[0].Image;
        const resolvedPath = path.resolve(filePath);
        console.log("Resolved file path:", resolvedPath);


        const result = await modelDeleteUser(userId[0].id);
         if(result.error){
            return res.status(500).json({ msg: "Terjadi kesalahan di server" });
        }
          // Delete the file from the filesystem
        if (filePath) {
            await deleteFile(resolvedPath);
        }

        return res.status(200).json({ msg: "Delete User Success" });

    } catch (error) {
        console.log("check error", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
};

export { 
    GetUser, 
    GetUserId,
    userResetPassword,
    UpdateProfile, 
    deleteAkun, 
    updateUserRole
}