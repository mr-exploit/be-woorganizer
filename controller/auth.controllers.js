import { query } from "../db/connection.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { modelRegister, modelRegisterCheck, modelUser } from "../db/models/auth.models.js"

dotenv.config()

const register = async(req,res)=>{
    const {email, username, password } = req.body
    const roleid = "3";

    // if(username===""||username===undefined||password===""||password===undefined||confPassword===""||confPassword===undefined){
    //     return res.status(400).json({error:"Field must not be empty"})
    // }

    // if (password!==confPassword){
    //     return res.status(400).json({error:"Password not match"})
    // 

    try {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password,salt)

        const result = await modelRegister(email, username, hash, roleid);
        if(result.error){
            return res.status(400).json(result)
        } else if(result === "Register Failed") {
            return res.status(400).json({msg:"Register Failed"})
        }
        return res.status(200).json({ status : 202, msg :"Register Success", data :result});

    } catch (error) {
    
        console.log("error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}


const login = async (req, res) => {
    const { email, password: inputPass } = req.body;
    
    // Validasi input username dan password
    if (!email || !inputPass) {
        return res.status(400).json({ error: "email dan password harus diisi" });
    }

    try {
        const result = await query("SELECT id FROM user WHERE email = ?", [email]);
        
        if (!Array.isArray(result) || result.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const validation = result[0];
        const checkResult = await query("SELECT id, Email,Nama, Password FROM user WHERE id = ?", [validation.id]);

        if (!Array.isArray(checkResult) || checkResult.length === 0) {
            return res.status(400).json({ error: "User not found" });
        }

        const check = checkResult[0];
        const isMatch = await bcrypt.compare(inputPass, check.Password);

        if (!isMatch) {
            return res.status(400).json({ error: "Password is wrong" });
        }

        const data = {
            id: check.id,
            email: check.Email,
            nama : check.Nama,
            sub : check.id
        };

        jwt.sign(data, process.env.SECRETKEY, (err, token) => {
            if (err) throw err;
            return res.status(200).json({ 
                msg : "Login Success",
                Authorization: `${token}`,
                data: {
                    id: data.id,
                    email: data.email,
                    username : data.nama
                },
             });
        });

    } catch (err) {
        console.log("check error", err)
        return res.status(500).json({ msg: `Terjadi kesalahan ` });
    }
};

const checkUser = async(req,res,next)=>{
    try {
        const userId = req.params.id;
        const user = await modelUser(userId);
        if (user === "User not found"){
            return res.status(400).json({error:"User not found"})
        }else if(user.error){
            return res.status(500).json({msg : `Terjadi kesalahan di server`})
        }
       
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }

}

const checkemail = async(req,res,next)=>{
    const email = req.params.email
    try {
        const result = await query("SELECT * FROM user WHERE Email = ?", [email]);
        if(result.length===0){
            return res.status(400).json({msg:"Email not found"})
        }
        return res.status(200).json({msg : "Email Success", data :result});
    } catch (error) {
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

const resetPassword = async(req,res,next)=>{
    const {email, password, confPassword} = req.body

    if(password===""||password===undefined||confPassword===""||confPassword===undefined){
        return res.status(400).json({error:"Field must not be empty"})
    }

    if (password!==confPassword){
        return res.status(400).json({error:"Password not match"})
    }

    try {
        const salt = await bcrypt.genSalt(12)
        const hash = await bcrypt.hash(password,salt)

        const result = await query("UPDATE user SET Password = ? WHERE Email = ?", [hash, email]);
        if(result.error){
            return res.status(400).json(result)
        }
        return res.status(200).json({ status : 202, msg :"Reset Password Success", data :result});

    } catch (error) {
        console.log("error", error)
        return res.status(500).json({msg:"terjadi kesalahan pada server"})
    }
}

export {register, login, checkUser, resetPassword}