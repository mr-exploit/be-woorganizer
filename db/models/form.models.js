import { query } from "../connection.js"
import dotenv from 'dotenv'
dotenv.config()

const modelFormGet = async()=>{
    try {
        const result = await query(`SELECT * FROM form `);
        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modeLFormGetIdOne = async(id)=>{
    try {
        const result = await query(`SELECT * FROM form WHERE id_user = ?`, [id]);
        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelFormGetUserEmail = async()=>{
    try {
        const result = await query(`SELECT DISTINCT(u.email), u.id, u.email,u.nama, u.alamat, u.no_hp  FROM form f
                INNER JOIN USER u ON f.id_user = u.id`);
        if(result.length === 0){
            return "Data Form tidak ditemukan"
        }
        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelFormGetIdUser = async(id)=>{
    try {
        const result = await query(`SELECT * FROM form WHERE id_user= ?`, [id]);

        if(result.length === 0){
            return "Data Form tidak ditemukan"
        }
        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelFormGetId = async(id)=>{
    try {
        const result = await query(`SELECT * FROM form WHERE id= ?`, [id]);

        if(result.length === 0){
            return "Data Form tidak ditemukan"
        }
        return result
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelFormPost = async(nama_depan, nama_belakang, email, nohp, konsep, id_user, is_update)=>{
    try {
        const result = await query(`INSERT INTO form (Nama_Depan, Nama_Belakang, Email, No_HP, Konsep, id_user, is_update)
        VALUES (?, ?, ?, ?, ?, ?, ?);
        `, [nama_depan, nama_belakang, email, nohp, konsep, id_user, is_update]);

        return result;
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelFormUpdate = async(nama_depan, nama_belakang, email, nohp, konsep, id_user, is_update ,id)=>{
    try {
       
        const result = await query(`UPDATE form SET Nama_Depan = ?, Nama_Belakang = ?, Email = ?, No_HP = ?, Konsep = ?, id_user = ?, is_update = ?
        WHERE id = ?
        `, [nama_depan, nama_belakang, email, nohp, konsep, id_user, is_update, id]);

         if(result === undefined){
            return "Gagal menambahkan data"
        }
        return result;
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelFormDelete = async(id)=>{
    try {
        const result = await query(`DELETE FROM form WHERE id = ?`, [id]);
        console.log("result", result)
        return "Form Berhasil Dihapus";
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

export {modelFormGet,
        modelFormGetUserEmail,
        modelFormGetIdUser,
        modeLFormGetIdOne,
        modelFormGetId, 
        modelFormPost, 
        modelFormUpdate, 
        modelFormDelete
    }