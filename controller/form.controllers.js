
import dotenv from 'dotenv'
import { modelFormDelete, modelFormGet, modelFormGetId, modeLFormGetIdOne, modelFormGetIdUser, modelFormGetUserEmail, modelFormPost, modelFormUpdate } from '../db/models/form.models.js';
import { modelUser } from '../db/models/auth.models.js';
dotenv.config()

const GetForm = async(req,res,next)=>{
    try {
        const result = await modelFormGet();
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const getFormUseremail = async(req, res, next)=>{
    try {
        const result = await modelFormGetUserEmail();
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }else if(result === "Data Form tidak ditemukan"){
            return res.status(404).json({msg : "Data Form tidak ditemukan"})    
        }
        
        return res.status(200).json({ data : result});
       
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetFormIdOne = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modeLFormGetIdOne(id);
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }

        return res.status(200).json({ data : result});
    }
    catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const GetFormIdUser = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelFormGetIdUser(id);
        
        
        if(result === "Data tidak ditemukan"){
            return res.status(400).json({msg : `Data Form tidak ditemukan`})
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

const GetFormId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await modelFormGetId(id);
        console.log(result)
        
        if(result === "Data tidak ditemukan"){
            return res.status(400).json({msg : `Data Form tidak ditemukan`})
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

const PostForm = async(req,res,next)=>{
    try {
        const {nama_depan, nama_belakang, email, nohp, konsep, is_update} = req.body;
        const { sub: iduser } = req.user;
        
        const result = await modelFormPost(nama_depan, nama_belakang, email, nohp, konsep, iduser, is_update);
       
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        const resultId = result.insertId;
        const data = {
            id : resultId,
            nama_depan: nama_depan,
            nama_belakang: nama_belakang,
            email: email,
            nohp: nohp,
            konsep: konsep,
            id_user: iduser,
            is_update: is_update
        }
        return res.status(200).json({msg:"Form berhasil ditambahkan Ditambahkan" , data : data});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const UpdateForm = async(req,res,next)=>{
    try {
        const {nama_depan, nama_belakang, email, nohp, konsep, is_update} = req.body;
        const {id} = req.params;

        const { sub: iduser } = req.user;
        
        const userRows = await modelUser(iduser);

        if (userRows === "User not found") {
            return 'id_user tidak valid';
        } else if(userRows.error){
            console.log("check error pada user", userRows.error)
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }

        const getIdForm = await modelFormGetId(id);
        if(getIdForm === "Data Form tidak ditemukan") return res.status(400).json({msg : `Data Form tidak ditemukan`})
        if(getIdForm.error) return res.status(500).json({msg : `Terjadi kesalahan di server`})

        const result = await modelFormUpdate(nama_depan, nama_belakang, email, nohp, konsep, userRows[0].id, is_update, id);
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }else if(result === "Data Form tidak ditemukan"){
            return res.status(400).json({msg : `Data Form tidak ditemukan`})
        }
      
        return res.status(200).json({msg:"Form berhasil Diupdate"});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const DeleteForm = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const formGetId = await modelFormGetId(id);
        if(formGetId === "Data Form tidak ditemukan") return res.status(400).json({msg : `Data Form tidak ditemukan`})
        
        const result = await modelFormDelete(id);
       

        return res.status(200).json({msg: result});

    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

export {GetForm,GetFormId,
    getFormUseremail, 
    GetFormIdOne,
    GetFormIdUser, 
    PostForm, 
    UpdateForm, 
    DeleteForm}