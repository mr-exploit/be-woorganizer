import { query } from "../connection.js"
import dotenv from 'dotenv'

dotenv.config()

const modelGetSchedule = async()=>{
    try {
        const result = await query(`SELECT * FROM schedule `);
            
        if(result.length===0) return "Data tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelGetIdSchedule = async(id)=>{
    try {
        const result = await query(`SELECT * FROM schedule where id=?`, [id]);
            
        if(result.length===0) return "Data Schedule tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelInsertSchedule= async(tanggal, keterangan, ajukan_perubahan)=>{
    try {
        const result = await query(`
                                INSERT INTO schedule (Tanggal, Keterangan, Ajukan_Perubahan) VALUES (?, ? , ?)`, [tanggal, keterangan, ajukan_perubahan]);
            
        if(result === undefined){
            return "Gagal menambahkan data"
        }

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelUpdateSchedule= async(tanggal, keterangan, ajukan_perubahan, id)=>{
    try {
        const result = await query(`                   
                    UPDATE schedule SET Tanggal=?, Keterangan=?, Ajukan_Perubahan=? WHERE id=?`, [tanggal, keterangan, ajukan_perubahan, id]);

            if(result === undefined){
            return "Gagal Update data"
            }

            return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelDeleteSchedule = async(id)=>{
    try {
        const result = await query(`DELETE FROM schedule where id = ?`, [id]);

        return "Schedule Berhasil Dihapus"
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

export {
    modelGetSchedule,
    modelGetIdSchedule,
    modelInsertSchedule,
    modelUpdateSchedule,
    modelDeleteSchedule
}
