
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { modelConceptGet, ModelConceptIdForm, ModelConceptIdFormUser, ModelGetConceptIdForm, ModelInsertConcept } from '../db/models/concept.models.js';

dotenv.config()

const GetConcept = async(req,res,next)=>{
    try {
        const result = await modelConceptGet();
       
        if(result === "Data tidak ditemukan"){
            return res.status(400).json({msg : `Data tidak ditemukan`})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        return res.status(200).json({ data : result});
       
    } catch (error) {
        return res.status(500).json({error:"Terjadi kesalahan"})
    }
}

const getConceptId = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await ModelGetConceptIdForm(id);
        if(result === "Data tidak ditemukan"){
            return res.status(400).json({msg : `Data tidak ditemukan`})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        return res.status(200).json({ data : result});
       
    } catch (error) {
        return res.status(500).json({error:"Terjadi kesalahan"})
    }
}

const getConceptEmailForm = async(req,res,next)=>{
    try {
        const {id} = req.params;
        const result = await ModelConceptIdFormUser(id);
        if(result === "Data tidak ditemukan"){
            return res.status(400).json({msg : `Data tidak ditemukan`})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        return res.status(200).json({ data : result});

    } catch (error) {
        return res.status(500).json({error:"Terjadi kesalahan"})
    }
}

const getConceptIdForm = async(req,res,next)=>{
    try {
        const result = await ModelConceptIdForm();
        if(result === "Data tidak ditemukan"){
            return res.status(400).json({msg : `Data tidak ditemukan`})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        
        return res.status(200).json({ data : result});
       
    } catch (error) {
        return res.status(500).json({error:"Terjadi kesalahan"})
    }
}

const insertConcept = async(req,res,next)=>{
    try {
        const {id_form, id_wdid_male, id_wdid_female, inter_decor, tamu, budget, hari_h, tema, detail_acara
        } = req.body;
        const result = await ModelInsertConcept(id_form, id_wdid_male, id_wdid_female, inter_decor, tamu, budget, hari_h, tema, detail_acara);
        console.log("check result", result)
        if(result === "Gagal menambahkan data"){
            return res.status(400).json({msg : `Gagal menambahkan data`})
        }
        if(result.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
        var data = {
            id_form : id_form,
            id_wdid_male : id_wdid_male,
            id_wdid_female : id_wdid_female,
            inter_decor : inter_decor,
            tamu : tamu,
            budget : budget,
            hari_h : hari_h,
            tema : tema,
            detail_acara : detail_acara
        }
        return res.status(202).json({ 
            status : "202",
            msg: result, 
            data : data});
    } catch (error) {
        console.log("check error", error)
        return res.status(500).json({error:"Terjadi kesalahan"})
    }
}


export {
    GetConcept, 
    getConceptEmailForm,
    getConceptId, 
    getConceptIdForm, 
    insertConcept
}