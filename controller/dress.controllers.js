
import dotenv from 'dotenv'
import { modelDeleteDress, modelGetAllDress, modelGetIdDress, modelGetIdSexDress, modelInsertDress, modelUpdateDress } from '../db/models/dress.models.js';
import fs from 'fs';
import path from 'path';

dotenv.config()

const deleteFile = async (filePath) => {
    try {
        await fs.promises.unlink(filePath);
    } catch (error) {
        console.error(`Failed to delete file at ${filePath}:`, error);
    }
};

const GetDressAll = async(req,res,next)=>{
    try {
        const result = await modelGetAllDress();
        if(result.error){
            console.log("check Dress Error", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data tidak ditemukan") return res.status(400).json({msg : `Data Dress tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetDressId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelGetIdSexDress(id);
        
        if(result.error){
            console.log("check Dress Error", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data Dress tidak ditemukan") return res.status(400).json({msg : `Data Dress tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const insertDress = async(req,res,next)=>{
    try {
        const { nama_dress, sex } = req.body;
         // Get the file path from Multer
         const imagePath = req.file ? req.file.path : null;

         if(!imagePath){
            return res.status(400).json({msg : `Image tidak boleh kosong`})
        }
        // Validasi nilai sex
        const validSexValues = ['Male', 'Female'];
        if (!validSexValues.includes(sex)) {
            return res.status(400).json({ msg: "Nilai sex tidak valid. Harus 'Male' atau 'Female'." });
        }

        const result = await modelInsertDress(nama_dress, sex, imagePath);
        
        if (result === "Gagal menambahkan data") {
            return res.status(400).json({ msg: `Terjadi kesalahan: ${result}` });
        }

        if(result.error){
            console.log("check Dress Error", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        const resultData = await modelGetIdDress(result.insertId);
        if(resultData === "Data Dress tidak ditemukan") return res.status(400).json({msg : `Data Dress tidak ditemukan`})
        if(resultData.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})

        const image = resultData[0].img;

        const data = {
            nama_dress,
            sex,
            image
        };

        return res.status(200).json({ msg: "Dress berhasil ditambahkan", data: data });

    } catch (error) {
        console.log("check error", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

const UpdateDress = async(req,res,next)=>{
    try {
        const {nama_dress, sex} = req.body;
        const {id} = req.params;
        const getId = await modelGetIdDress(id);
        if(getId === "Data Dress tidak ditemukan") return res.status(400).json({msg : `Data Dress tidak ditemukan`})

        const validSexValues = ['Male', 'Female'];
        if (!validSexValues.includes(sex)) {
            return res.status(400).json({ msg: "Nilai sex tidak valid. Harus 'Male' atau 'Female'." });
        }

         const existingImagePath = path.resolve(getId[0].img);
        
         if (req.file) {
             const newImageBuffer = await fs.promises.readFile(req.file.path);
 
             await fs.promises.writeFile(existingImagePath, newImageBuffer);
 
             await fs.promises.unlink(req.file.path);
         }

         
        const result = await modelUpdateDress(nama_dress, sex, getId[0].img, getId[0].id);
        
        
        if(result === "Gagal menambahkan data"){
            return res.status(400).json({msg : `terjadi kesalahan `})
        }
        if(result.error){
            console.log("check Dress Error", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        const data = {
            nama_dress, sex, img: getId[0].img
        }
        return res.status(200).json({msg:"Dress berhasil di Update" , data : data});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const DeleteDress = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const getId = await modelGetIdDress(id);
        if(getId === "Data Dress tidak ditemukan") return res.status(400).json({msg : `Data Dress tidak ditemukan`})
        
        if(getId.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})

        const filePath = getId[0].img;
        const resolvedPath = path.resolve(filePath);
        console.log("Resolved file path:", resolvedPath);
  
        const result = await modelDeleteDress(id);
        if(result.error){
            console.log("check Dress Error", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }

        if (filePath) {
            await deleteFile(resolvedPath);
        }
        return res.status(200).json({msg: result});
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

export {
    GetDressAll,
    GetDressId,
    insertDress,
    UpdateDress,
    DeleteDress
}