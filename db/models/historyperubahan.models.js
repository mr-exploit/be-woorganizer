import { query } from "../connection.js"
import dotenv from 'dotenv'

dotenv.config()

const modelGetHistoryAll = async()=>{
    try {
        const result = await query(`SELECT * FROM histori_perubahan `);
            
        if(result.length===0) return "Data tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}


const modelGetHistoryIdUser = async(id)=>{
    try {
        const result = await query(`SELECT * FROM   histori_perubahan hp
        INNER JOIN form f ON hp.id_form = f.id
        WHERE f.id_user = ?`, [id]);
            
        if(result.length===0) return "Data tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelGetIdHistory = async(id)=>{
    try {
        const result = await query(`SELECT * FROM histori_perubahan where id=?`, [id]);
            
        if(result.length===0) return "Data History tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelInsertHistory= async(tipe, id_form, text, createdate)=>{
    try {
        const result = await query(`
                                INSERT INTO histori_perubahan (tipe, id_form, text, createdate) VALUES (?, ?, ?, ?)`, [tipe, id_form, text, createdate]);
            
        if(result === undefined){
            return "Gagal menambahkan data"
        }

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelUpdateHistory= async(tipe, id_form, text, createdate, id)=>{
    try {
        const result = await query(`                   
                    UPDATE histori_perubahan SET tipe=?, id_form=?, text=?, createdate=? WHERE id=?`, [tipe, id_form, text, createdate, id]);

            if(result === undefined){
            return "Gagal Update data"
            }

            return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelDeleteHistory = async(id)=>{
    try {
        const result = await query(`DELETE FROM histori_perubahan where id = ?`, [id]);

        return "History Berhasil Dihapus"
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

export {
    modelGetHistoryAll,
    modelGetHistoryIdUser,
    modelGetIdHistory,
    modelInsertHistory,
    modelUpdateHistory,
    modelDeleteHistory
}
