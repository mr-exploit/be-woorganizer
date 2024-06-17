import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config()

// connection Production
// const db = mysql.createPool({
//     host:process.env.HOST,
//     user:process.env.USER,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE,
//     port : process.env.PORT_DB
// })
//connection local
const db = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
    port : process.env.PORT_DB
})

const testConnection=async()=>{
    try{
        await db.getConnection()
        console.log("Berhasil Connection");
    }catch(e){
        console.log("GAGAL Connection", e)
    }
}

const query = async (query,value)=>{
    try{
        const [result] = await db.query(query, value??[])
        return result
    }catch(error){
        console.log("GAGAL Query")
        throw error;
    }
}

export {testConnection,query}