import { query } from "../connection.js"
import dotenv from 'dotenv'

dotenv.config()

const modelGetVendor = async()=>{
    try {
        const result = await query(`SELECT * FROM master_vendor `);
            
        if(result.length===0) return "Data Vendor tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelGetIdVendor = async(id)=>{
    try {
        const result = await query(`SELECT * FROM master_vendor where id=?`, [id]);
            
        if(result.length===0) return "Data Vendor tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelInsertVendor= async(nama_vendor, alamat, no_telp, harga, kategori)=>{
    try {
        const result = await query(`
                                INSERT INTO master_vendor (nama_vendor, alamat, no_telp, harga, kategori) 
                                VALUES (?, ?, ?, ?, ?)`, [nama_vendor, alamat, no_telp, harga, kategori]);
            
        if(result === undefined){
            return "Gagal menambahkan data"
        }

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelUpdateVendor = async(nama_vendor, alamat, no_telp, harga, kategori, id)=>{
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

const modelDeleteVendor = async(id)=>{
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
    modelGetVendor,
    modelGetIdVendor,
    modelInsertVendor,
    modelUpdateVendor,
    modelDeleteVendor
}
