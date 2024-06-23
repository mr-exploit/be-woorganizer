import { query } from "../connection.js"
import dotenv from 'dotenv'

dotenv.config()

const modelGetRincianAnggaran = async()=>{
    try {
        const result = await query(`SELECT * FROM master_rincian_anggaran`);
            
        if(result.length===0) return "Data tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelGetFormUser = async()=>{
    try {
        const result = await query(`   SELECT DISTINCT(u.email), f.id AS id_form, u.email, u.nama, u.alamat, u.no_hp  FROM form f
        INNER JOIN USER u ON f.id_user = u.id`);
            
        if(result.length===0) return "Data tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const ModelTotalRincianAnggaran = async()=>{
    try {
        const result = await query(`SELECT SUM(Harga_Awal) 
            AS  Rincian_Anggaran FROM master_rincian_anggaran `);
            
        if(result.length===0) return "Data tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelGetIdRincianAnggaran = async(id)=>{
    try {
        const result = await query(`SELECT * FROM master_rincian_anggaran where id = ?`, [id]);
            
        if(result.length===0) return "Data Anggaran tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelGetIdRincianForm = async(id)=>{
    try {
        const result = await query(` SELECT mra.* FROM master_rincian_anggaran mra
        INNER JOIN form f ON f.id = mra.id_form
        WHERE f.id=?`, [id]);
            
        if(result.length===0) return "Data Anggaran tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelInsertRincianAnggaran = async(id_form, Uraian, Vol, Harga_Awal, Jumlah, Keterangan)=>{
    try {
        const result = await query(`
                                INSERT INTO master_rincian_anggaran (id_form, Uraian, Vol, Harga_Awal, Jumlah, Keterangan) 
                                VALUES (?, ?, ?, ?, ?, ?)`, [id_form, Uraian, Vol, Harga_Awal, Jumlah, Keterangan]);
            
        if(result === undefined){
            return "Gagal menambahkan data"
        }

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelUpdateRincianAnggaran = async(Uraian, Vol, Harga_Awal, Jumlah, Keterangan, id)=>{
    try {
        const result = await query(`     
                    UPDATE master_rincian_anggaran SET Uraian=?, Vol=?, Harga_Awal=?,Jumlah=?, Keterangan=? WHERE id=?`, [Uraian, Vol, Harga_Awal, Jumlah, Keterangan, id]);

            if(result === undefined){
            return "Gagal menambahkan data"
            }

            return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelDeleteRincianAnggaran = async(id)=>{
    try {
        const result = await query(`DELETE FROM master_rincian_anggaran where id = ?`, [id]);
        console.log("result", result)
        return "Rincian Anggaran Berhasil Dihapus"
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

export {
    modelGetRincianAnggaran,
    modelGetFormUser,
    modelGetIdRincianForm,
    ModelTotalRincianAnggaran,
    modelGetIdRincianAnggaran,
    modelInsertRincianAnggaran,
    modelUpdateRincianAnggaran,
    modelDeleteRincianAnggaran
}
