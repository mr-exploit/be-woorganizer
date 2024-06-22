
import dotenv from 'dotenv'
import { modelDeleteInterior, modelGetIdInterior, modelGetInterior, modelInsertInterior, modelUpdateInterior } from '../db/models/interior.models.js';
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

const GetInteriorAll = async(req,res,next)=>{
    try {
        const result = await modelGetInterior();

        if(result.error){
            console.log("check resultInteriorall", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data tidak ditemukan") return res.status(400).json({msg : `Data Interior tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetInteriorId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelGetIdInterior(id);

        if(result.error){
            console.log("check resultInteriorid", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data Interior tidak ditemukan") return res.status(400).json({msg : `Data Interior tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const insertInterior = async(req,res,next)=>{
    try {
        const { jenis, vendor, no_telp, harga, konsep} = req.body;
         // Get the file path from Multer
         const imagePath = req.file ? req.file.path : null;

         if(!imagePath){
            return res.status(400).json({msg : `Image tidak boleh kosong`})
        }

        const result = await modelInsertInterior(jenis, vendor, no_telp, harga, konsep, imagePath);

        if (result === "Gagal menambahkan data") {
            return res.status(400).json({ msg: `Terjadi kesalahan: ${result}` });
        }

        if (result.error) {
            console.log("check error insertInterior", result.error)
            return res.status(500).json({ msg: `Terjadi kesalahan di server`});
        }
        const resultimg = await modelGetIdInterior(result.insertId);
        if(resultimg === "Data Interior tidak ditemukan") return res.status(400).json({msg : `Data Interior tidak ditemukan`})

        if(resultimg.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})

        const imginterior = resultimg[0].image;

        const data = {
            jenis : jenis, 
            vendor : vendor, 
            no_telp : no_telp, 
            harga : harga, 
            konsep : konsep, 
            imginterior : imginterior
        };

        return res.status(200).json({ msg: "Interior berhasil ditambahkan", data: data });

    } catch (error) {
        console.log("check error", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

const UpdateInterior = async(req,res,next)=>{
    try {
        const { jenis, vendor, no_telp, harga, konsep } = req.body;
        const {id} = req.params;
        const getId = await modelGetIdInterior(id);
        if(getId === "Data Interior tidak ditemukan") return res.status(400).json({msg : `Data Interior tidak ditemukan`})
        if(getId.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})

        const existingImagePath = path.resolve(getId[0].image);
    
        if (req.file) {
            const newImageBuffer = await fs.promises.readFile(req.file.path);

            await fs.promises.writeFile(existingImagePath, newImageBuffer);

            await fs.promises.unlink(req.file.path);
        }

        const result = await modelUpdateInterior(jenis, vendor, no_telp, harga, konsep, getId[0].image, getId[0].id);
        
        if(result === "Gagal menambahkan data"){
            return res.status(400).json({msg : `terjadi kesalahan `})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        const data = {
            jenis : jenis, 
            vendor : vendor, 
            no_telp : no_telp, 
            harga : harga, 
            konsep : konsep, 
            imginterior : getId[0].image
        };
        return res.status(200).json({msg:"Interior berhasil di Update" , data : data});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

// delete interior
const DeleteInterior = async(req,res,next)=>{
    try {
        const { id } = req.params;
        const getId = await modelGetIdInterior(id);

        if (getId === "Data Interior tidak ditemukan") {
            return res.status(400).json({ msg: `Data Interior tidak ditemukan` });
        } else if (getId.error) {
            return res.status(500).json({ msg: `Terjadi kesalahan di server` });
        }

        const filePath = getId[0].image;
        const resolvedPath = path.resolve(filePath);

        // Delete the entry from the database
        const result = await modelDeleteInterior(id);

        if (result.error) {
            return res.status(500).json({ msg: `Terjadi kesalahan di server` });
        }

        // Delete the file from the filesystem
        if (filePath) {
            await deleteFile(resolvedPath);
        }

        return res.status(200).json({ msg: "Delete Interior Success" });
    } catch (error) {
        console.log("check error", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

export {
    GetInteriorAll,
    GetInteriorId,
    insertInterior,
    UpdateInterior,
    DeleteInterior
}


