
import dotenv from 'dotenv'
import { modelDeleteRelasi_MWD, modelGetIdRelasi_MWD, modelInsertRelasi_MWD } from '../db/models/relasimwd.models.js';


dotenv.config()

const GetRelasi_MWDId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelGetIdRelasi_MWD(id);
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data tidak ditemukan") return res.status(400).json({msg : `Data Vendor tidak ditemukan`})
       
        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const insertRelasiMWD = async(req,res,next)=>{
    try {
        const {id_form, id_concept, id_mwd } = req.body;
        const result = await modelInsertRelasi_MWD(id_form, id_concept, id_mwd);
        if(result === "Gagal menambahkan data"){
            return res.status(400).json({msg : `terjadi kesalahan : ${result}`})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        
        const resultId = result.insertId

        const data = {
            id : resultId, id_form, id_concept, id_mwd
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

const DeleteRelasiMWD = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const getId = await modelGetIdRelasi_MWD(id); 
        if(getId === "Data Vendor tidak ditemukan") return res.status(400).json({msg : `Data Vendor tidak ditemukan`})
        
        const result = await modelDeleteRelasi_MWD(id);
        if(result.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})
            
        return res.status(200).json({msg: result});
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

export {
    GetRelasi_MWDId,
    insertRelasiMWD,
    DeleteRelasiMWD

}