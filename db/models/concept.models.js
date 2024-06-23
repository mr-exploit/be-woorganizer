import { query } from "../connection.js"
import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

dotenv.config()

const modelConceptGet = async()=>{
    try {
        const result = await query(`SELECT f.Nama_Depan, f.Nama_Belakang, f.Email, f.konsep, 
        mwdm.nama_dress AS namedressmale, mwdm.sex AS sexdressmale, mwdf.nama_dress AS namedressfemale, mwdf.sex AS sexdressfemale, 
        c.Interior_Decoration AS interiorDecoration, c.Tamu AS tamu, 
        c.Budget AS budge, c.Hari_H AS hari_H, c.Tema AS tema, c.Detail_Acara AS detailacara
        FROM concept c
        INNER JOIN form f ON f.id = c.id_form
        INNER JOIN master_wedding_dress mwdm ON c.id_wedding_dress_id_male = mwdm.id
        INNER JOIN master_wedding_dress mwdf ON c.id_wedding_dress_id_female = mwdf.id
                                    `);
            if(result.length ===0){
                return "Data tidak ditemukan"
            }
        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const ModelConceptIdForm = async()=>{
    try {
        const result = await query(`
               SELECT DISTINCT(u.email), f.id as id_form, u.email, u.nama, u.alamat, u.no_hp  FROM form f
INNER JOIN USER u ON f.id_user = u.id`);
        if(result.length ===0){
            return "Data tidak ditemukan"
        }
        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const ModelGetConceptIdForm = async(id)=>{
    try {
        const result = await query(`
                     SELECT c.* FROM concept c
                 INNER JOIN form f ON c.id_form = f.id
                INNER JOIN USER u ON f.id_user = u.id
                 WHERE u.id= ?`, [id]);

        if(result.length ===0){
            return "Data tidak ditemukan"
        }
        return result
    }
    catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const ModelConceptIdFormUser = async(id)=>{
    try {
        const result = await query(`
                SELECT DISTINCT(u.email), u.nama, u.image, c.* FROM concept c
                INNER JOIN form f ON c.id_form = f.id
                INNER JOIN USER u ON f.id_user = u.id
                WHERE c.id_form = ?`, [id]);
        if(result.length ===0){
            return "Data tidak ditemukan"
        }
        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}
const ModelInsertConcept = async (id_form, id_wdid_male, id_wdid_female, inter_decor, tamu, budget, hari_h, tema, detail_acara) =>{
    try {
        const result = await query(`INSERT INTO concept (id_form, id_wedding_dress_id_male, id_wedding_dress_id_female, Interior_Decoration, Tamu, Budget, Hari_H, Tema, Detail_Acara)
        VALUES (?,?,?,?,?,?,?,?,?)`, [id_form, id_wdid_male, id_wdid_female, inter_decor, tamu, budget, hari_h, tema, detail_acara]);
        console.log("result", result)
        if(result === undefined){
            return "Gagal menambahkan data"
        }
        return result;
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}



export{modelConceptGet,
    ModelGetConceptIdForm, 
    ModelConceptIdFormUser,
    ModelConceptIdForm, 
    ModelInsertConcept}
