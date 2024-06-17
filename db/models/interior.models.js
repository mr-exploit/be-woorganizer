import { query } from "../connection.js"
import dotenv from 'dotenv'

dotenv.config()

const modelGetInterior = async()=>{
    try {
        const result = await query(`SELECT * FROM master_interior `);
            
        if(result.length===0) return "Data tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelGetIdInterior = async(id)=>{
    try {
        const result = await query(`SELECT * FROM master_interior where id=?`, [id]);
            
        if(result.length===0) return "Data Interior tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelInsertInterior= async(jenis, vendor, no_telp, harga, konsep, imginterior)=>{
    try {
        const result = await query(`
                                INSERT INTO master_interior (jenis, vendor, no_telp, harga, konsep, image) VALUES (?, ?, ?, ?, ?, ?)`, [jenis, vendor, no_telp, harga, konsep, imginterior]);
            
        if(result === undefined){
            return "Gagal menambahkan data"
        }

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelUpdateInterior= async(jenis, vendor, no_telp, harga, konsep, imginterior, id)=>{
    try {
        const result = await query(`                   
                    UPDATE master_interior SET jenis=?, vendor=?, no_telp=?, harga=?, konsep=?, image=? WHERE id=?`, [jenis, vendor, no_telp, harga, konsep, imginterior, id]);

            if(result === undefined){
            return "Gagal Update data"
            }

            return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelDeleteInterior = async(id)=>{
    try {
        const result = await query(`DELETE FROM master_interior where id = ?`, [id]);

        return "Interior Berhasil Dihapus"
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

export {
    modelGetInterior,
    modelGetIdInterior,
    modelInsertInterior,
    modelUpdateInterior,
    modelDeleteInterior
}
