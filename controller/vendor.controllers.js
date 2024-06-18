
import dotenv from 'dotenv'
import { modelDeleteVendor, modelGetIdVendor, modelGetVendor, modelInsertVendor, modelUpdateVendor } from '../db/models/vendor.models.js';

dotenv.config()

const GetVendorAll = async(req,res,next)=>{
    try {
        const result = await modelGetVendor();
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data Vendor tidak ditemukan") return res.status(400).json({msg : `Data Vendor tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetVendorId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelGetIdVendor(id);
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data tidak ditemukan") return res.status(400).json({msg : `Data Vendor tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const insertVendor = async(req,res,next)=>{
    try {
        const {nama_vendor, alamat, no_telp, harga, kategori} = req.body;
        const result = await modelInsertVendor(nama_vendor, alamat, no_telp, harga, kategori);
        if(result === "Gagal menambahkan data"){
            return res.status(400).json({msg : `terjadi kesalahan : ${result}`})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        
        const data = {
            nama_vendor, alamat, no_telp, harga, kategori
        }
        return res.status(200).json({msg:"Vendor berhasil Ditambahkan" , data : data});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const UpdateVendor = async(req,res,next)=>{
    try {
        const {nama_vendor, alamat, no_telp, harga, kategori} = req.body;
        const {id} = req.params;
        const getId = await modelGetIdVendor(id);
        if(getId === "Data Vendor tidak ditemukan") return res.status(400).json({msg : `Data Vendor tidak ditemukan`})
            
        const result = await modelUpdateVendor(nama_vendor, alamat, no_telp, harga, kategori, id);
        if(result === "Gagal menambahkan data"){
            return res.status(400).json({msg : `terjadi kesalahan `})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        const data = {
            nama_vendor, alamat, no_telp, harga, kategori
        }
        return res.status(200).json({msg:"Vendor berhasil di Update" , data : data});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const DeleteVendor = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const getId = await modelGetIdVendor(id);
        if(getId === "Data Vendor tidak ditemukan") return res.status(400).json({msg : `Data Vendor tidak ditemukan`})
        
        const result = await modelDeleteVendor(id);
        if(result.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})
            
        return res.status(200).json({msg: result});
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

export {
    GetVendorAll,
    GetVendorId, 
    insertVendor, 
    UpdateVendor, 
    DeleteVendor
}