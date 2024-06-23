
import dotenv from 'dotenv'
import { modelDeleteSchedule, modelGetFormUserSchedule, modelGetIdSchedule, modelGetSchedule, modelGetScheduleIdForm, modelInsertSchedule, modelUpdateSchedule } from '../db/models/schedule.models.js';

dotenv.config()

const GetScheduleAll = async(req,res,next)=>{
    try {
        const result = await modelGetSchedule();

        if(result.error){
            console.log("check resultScheduleall", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data tidak ditemukan") return res.status(400).json({msg : `Data Schedule tidak ditemukan`})

            console.log("check result hasil", result)
        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetScheduleFormUser = async(req,res,next)=>{
    try {
        const result = await modelGetFormUserSchedule();

        if(result.error){
            console.log("check resultScheduleall", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data tidak ditemukan") return res.status(400).json({msg : `Data Schedule tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetScheduleFormId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelGetScheduleIdForm(id);
        if(result.error){
            console.log("check resultScheduleid", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result.length === 0){
            return res.status(400).json({msg : `Data Schedule tidak ditemukan`})
        } 
        
        return res.status(200).json({ data : result});
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}


const GetScheduleId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelGetIdSchedule(id);

        if(result.error){
            console.log("check resultScheduleid", result.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        } else if(result === "Data Schedule tidak ditemukan") return res.status(400).json({msg : `Data Schedule tidak ditemukan`})

        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const insertSchedule = async(req,res,next)=>{
    try {
        const { keterangan, tanggal, id_form } = req.body;
        const AjukanPerubahan = "tidak";
        const result = await modelInsertSchedule(tanggal, keterangan, id_form, AjukanPerubahan);
        console.log("result", result)
        if (result === "Gagal menambahkan data") {
            return res.status(400).json({ msg: `Terjadi kesalahan: ${result}` });
        }

        if (result.error) {
            console.log("check error insertschedule", result.error)
            return res.status(500).json({ msg: `Terjadi kesalahan di server`});
        }

        const data = {
            tanggal : tanggal, 
            keterangan : keterangan, 
            id_form : id_form
        };

        return res.status(200).json({ msg: "Schedule berhasil ditambahkan", data: data });

    } catch (error) {
        console.log("check error", error);
        return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
    }
}

const UpdateSchedule = async(req,res,next)=>{
    try {
        const { tanggal, keterangan,  } = req.body;
        const ajukan_perubahan = "tidak";
        const {id} = req.params;
        const getId = await modelGetIdSchedule(id);
        if(getId === "Data Schedule tidak ditemukan") return res.status(400).json({msg : `Data Schedule tidak ditemukan`})
      
        const result = await modelUpdateSchedule(tanggal, keterangan, ajukan_perubahan, getId[0].id);
        
        if(result === "Gagal menambahkan data"){
            return res.status(400).json({msg : `terjadi kesalahan `})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        const data = {
            tanggal, 
            keterangan, 
            ajukan_perubahan 
        }
        return res.status(200).json({msg:"Schedule berhasil di Update" , data : data});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const DeleteSchedule = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const getId = await modelGetIdSchedule(id);
        if(getId === "Data Schedule tidak ditemukan") {
            return res.status(400).json({msg : `Data Schedule tidak ditemukan`})
        } else if(getId.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        const result = await modelDeleteSchedule(id);
        if(result.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})
            
        return res.status(200).json({msg: result});
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

export {
    GetScheduleAll,
    GetScheduleFormId,
    GetScheduleFormUser,
    GetScheduleId,
    insertSchedule,
    UpdateSchedule,
    DeleteSchedule
}