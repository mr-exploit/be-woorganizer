import { query } from "../connection.js"
import dotenv from 'dotenv'

dotenv.config()

const modelGetAllDress = async()=>{
    try {
        const result = await query(`SELECT * FROM master_wedding_dress `);
            
        if(result.length===0) return "Data tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}


const modelGetIdSexDress = async(id)=>{
    try {
        const result = await query(`SELECT * FROM master_wedding_dress where sex=?`, [id]);
            
        if(result.length===0) return "Data Dress tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}


const modelGetIdDress = async(id)=>{
    try {
        const result = await query(`SELECT * FROM master_wedding_dress where id=?`, [id]);
            
        if(result.length===0) return "Data Dress tidak ditemukan" 

        return result 
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelInsertDress = async(nama_dress, sex, img)=>{
    try {
        const result = await query(`
            INSERT INTO master_wedding_dress (nama_dress, sex, img) 
            VALUES (?, ?, ?)`, [nama_dress, sex, img]);

        if (!result || result.affectedRows === 0) {
            return "Gagal menambahkan data";
        }

        return result;
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelUpdateDress = async(nama_dress, sex, img, id)=>{
    try {
        const result = await query(`     
                    UPDATE master_wedding_dress SET nama_dress=?, sex=?, img=? WHERE id=?`, [nama_dress, sex, img, id]);
    
            if(result === undefined){
            return "Gagal menambahkan data"
            }

            return "Dress Berhasil Diupdate"
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

const modelDeleteDress = async(id)=>{
    try {
        const result = await query(`DELETE FROM master_wedding_dress where id = ?`, [id]);
       
        return "Dress Berhasil Dihapus"
    } catch (error) {
        console.log("Terjadi kesalahan di db:", error)
        return {error : `Error Message: ${error}`}
    }
}

export {
    modelGetAllDress,
    modelGetIdDress,
    modelGetIdSexDress, 
    modelInsertDress, 
    modelUpdateDress, 
    modelDeleteDress
}
