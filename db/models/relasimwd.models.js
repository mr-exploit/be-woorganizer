import { query } from "../connection.js"
import dotenv from 'dotenv'

dotenv.config()

const modelGetIdRelasi_MWD = async(id)=>{
    try {
        const result = await query(`SELECT rwd.id, rwd.id_form, rwd.id_concept, rwd.id_mwd, mwd.* FROM relasi_wedding_dress rwd
INNER JOIN concept c ON rwd.id_form = c.id_form
INNER JOIN form f ON c.id_form = f.id
INNER JOIN master_wedding_dress mwd ON rwd.id_mwd = mwd.id 
WHERE f.id_user= ?`, [id]);
            
        if(result.length===0) return "Data relasi Master_wedding tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelInsertRelasi_MWD= async(id_form, id_concept, id_mwd)=>{
    try {
        const result = await query(`
                                INSERT INTO master_wedding_dress (id_form, id_concept, id_mwd) 
                                VALUES (?, ?, ?)`, [id_form, id_concept, id_mwd]);
            
        if(result === undefined){
            return "Gagal menambahkan data"
        }

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}


const modelDeleteRelasi_MWD = async(id)=>{
    try {
        const result = await query(`DELETE FROM relasi_wedding_dress dwhere id = ?`, [id]);
        console.log("result", result)
        return "Data relasi Master_wedding Berhasil Dihapus"
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

export {
   modelGetIdRelasi_MWD,
    modelInsertRelasi_MWD,
    modelDeleteRelasi_MWD
}
