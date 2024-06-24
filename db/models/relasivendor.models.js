import { query } from "../connection.js"
import dotenv from 'dotenv'

dotenv.config()

const modelGetRelasi_Vendor = async()=>{
    try {
        const result = await query(`SELECT * FROM master_vendor `);
            
        if(result.length===0) return "Data Vendor tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelGetIdRelasi_Vendor = async(id)=>{
    try {
        const result = await query(`SELECT rc.id, rc.id_form, rc.id_concept, rc.id_vendor, mv.* FROM relasi_vendor rc
        INNER JOIN concept c ON rc.id_form = c.id_form
        INNER JOIN form f ON c.id_form = f.id
        INNER JOIN master_vendor mv ON rc.id_vendor = mv.id 
        WHERE f.id_user= ?`, [id]);
            
        if(result.length===0) return "Data Vendor tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelInsertRelasi_Vendor= async(id_form, id_concept, id_vendor)=>{
    try {
        const result = await query(`
                                INSERT INTO master_vendor (id_form, id_concept, id_vendor) 
                                VALUES (?, ?, ?)`, [id_form, id_concept, id_vendor]);
            
        if(result === undefined){
            return "Gagal menambahkan data"
        }

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelUpdateRelasi_Vendor = async(nama_vendor, alamat, no_telp, harga, kategori, id)=>{
    try {
        const result = await query(`     
                    UPDATE master_vendor SET nama_vendor=?, alamat=?, no_telp=?, harga=?, kategori=? WHERE id=?`, [nama_vendor, alamat, no_telp, harga, kategori, id]);

            if(result === undefined){
            return "Gagal menambahkan data"
            }

            return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelDeleteRelasi_Vendor = async(id)=>{
    try {
        const result = await query(`DELETE FROM master_vendor where id = ?`, [id]);
        console.log("result", result)
        return "Vendor Berhasil Dihapus"
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

export {
    modelGetRelasi_Vendor,
    modelGetIdRelasi_Vendor,
    modelInsertRelasi_Vendor,
    modelUpdateRelasi_Vendor,
    modelDeleteRelasi_Vendor
}
