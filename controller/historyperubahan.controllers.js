
import dotenv from 'dotenv'

import { modelUser } from '../db/models/auth.models.js';
import { modelDeleteHistory, modelGetHistoryAll, modelGetHistoryIdUser, modelGetIdHistory, modelInsertHistory, modelUpdateHistory } from '../db/models/historyperubahan.models.js';
dotenv.config()

const GetHistory = async(req,res,next)=>{
    try {
        const result = await modelGetHistoryAll();
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetHistoryIdUser = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelGetHistoryIdUser(id);
        console.log(result)
        
        if(result === "Data tidak ditemukan"){
            return res.status(400).json({msg : `Data History tidak ditemukan`})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const PostHistory = async (req, res, next) => {
    try {
        const { tipe, id_form, text } = req.body;
        const { sub: iduser } = req.user;
        
        // Membuat format datetime yang sesuai
        const createDate = new Date(); 
        const year = createDate.getFullYear();
        const month = String(createDate.getMonth() + 1).padStart(2, '0'); // getMonth() dimulai dari 0
        const day = String(createDate.getDate()).padStart(2, '0');
        const hours = String(createDate.getHours()).padStart(2, '0');
        const minutes = String(createDate.getMinutes()).padStart(2, '0');
        const seconds = String(createDate.getSeconds()).padStart(2, '0');
        const createdate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

        const result = await modelInsertHistory(tipe, id_form, text, createdate);

        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`});
        }

        const resultId = result.insertId;
        const data = {
            id: resultId,
            tipe, 
            id_form, 
            text, 
            createdate
        };

        return res.status(200).json({msg: "History berhasil ditambahkan", data: data});

    } catch (error) {
        console.log("check error", error);
        return res.status(500).json({msg: "Terjadi kesalahan pada server"});
    }
};

const UpdateHistory = async(req,res,next)=>{
    try {
        const {nama_depan, nama_belakang, email, nohp, konsep, is_update} = req.body;
        const {id} = req.params;

        const { sub: iduser } = req.user;
        
        const getIdHistory = await modelGetIdHistory(id);
        if(getIdHistory === "Data History tidak ditemukan") return res.status(400).json({msg : `Data History tidak ditemukan`})
        if(getIdHistory.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})

        const result = await modelUpdateHistory(nama_depan, nama_belakang, email, nohp, konsep, userRows[0].id, is_update, id);
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }else if(result === "Data History tidak ditemukan"){
            return res.status(400).json({msg : `Data History tidak ditemukan`})
        }
      
        return res.status(200).json({msg:"History berhasil Diupdate"});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const DeleteHistory = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const HistoryGetId = await modelGetIdHistory(id);
        if(HistoryGetId === "Data History tidak ditemukan") return res.status(400).json({msg : `Data History tidak ditemukan`})
        
        const result = await modelDeleteHistory(id);
       

        return res.status(200).json({msg: result});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

export {
    GetHistory,
    GetHistoryIdUser,
    PostHistory,
    UpdateHistory,
    DeleteHistory
}