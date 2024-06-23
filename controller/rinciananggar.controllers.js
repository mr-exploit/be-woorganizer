
import dotenv from 'dotenv'
import { modelDeleteRincianAnggaran, modelGetFormUser, modelGetIdRincianAnggaran, modelGetIdRincianForm, modelGetRincianAnggaran, modelInsertRincianAnggaran, ModelTotalRincianAnggaran, modelUpdateRincianAnggaran } from '../db/models/rincianangg.model.js';
dotenv.config()

const GetRincian = async(req,res,next)=>{
    try {
        const result = await modelGetRincianAnggaran();
        
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data tidak ditemukan") return res.status(400).json({msg : `Data tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetRincianfromUser = async(req,res,next)=>{
    try {
        const result = await modelGetFormUser();
        
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data tidak ditemukan") return res.status(400).json({msg : `Data tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const TotalRincianAnggaran = async(req,res,next)=>{
    try {
        const result = await ModelTotalRincianAnggaran();
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
      
        return res.status(200).json({ data : result});
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}
const GetRincianId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelGetIdRincianForm(id);
        console.log(result)
        
        if(result === "Data Anggaran tidak ditemukan"){
            return res.status(400).json({msg : `Data Anggaran tidak ditemukan`})
        }else if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const insertRincianAnggaran = async(req,res,next)=>{
    try {
        const {id_form, Uraian, Vol, Harga_Awal, Jumlah, Keterangan} = req.body;
        const result = await modelInsertRincianAnggaran(id_form, Uraian, Vol, Harga_Awal, Jumlah, Keterangan);
        if(result === "Gagal menambahkan data"){
            return res.status(400).json({msg : `terjadi kesalahan : ${result}`})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        const id = result.insertId;
        const data = {
            id, Uraian, Vol, Harga_Awal, Jumlah, Keterangan
        }
        return res.status(200).json({msg:"Rincian Anggaran berhasil Ditambahkan" , data : data});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const UpdateRincianAnggaran = async(req,res,next)=>{
    try {
        const {Uraian, Vol, Harga_Awal, Jumlah, Keterangan} = req.body;
        const {id} = req.params;
        const getId = await modelGetIdRincianAnggaran(id);

        if(getId === "Data Anggaran tidak ditemukan") return res.status(400).json({msg : `Data Anggaran tidak ditemukan`})

        const result = await modelUpdateRincianAnggaran(Uraian, Vol, Harga_Awal, Jumlah, Keterangan, id);

        if(result === "Gagal menambahkan data") return res.status(400).json({msg : `terjadi kesalahan : ${result}`})
        
        if(result.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})
  
        const data = {
            id : id, Uraian, Vol, Harga_Awal, Jumlah, Keterangan
        }
        return res.status(200).json({msg:"Rincian Anggaran berhasil di Update" , data : data});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const DeleteRincianAnggaran = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const getId = await modelGetIdRincianAnggaran(id);

        if(getId === "Data Anggaran tidak ditemukan") return res.status(400).json({msg : `Data Anggaran tidak ditemukan`})

        if(getId.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})

        const result = await modelDeleteRincianAnggaran(id);
        
        if(result.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})

        return res.status(200).json({msg: result});
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

export {
    GetRincian,
    GetRincianId,
    GetRincianfromUser,
    TotalRincianAnggaran,
    insertRincianAnggaran,
    UpdateRincianAnggaran,
    DeleteRincianAnggaran
}


