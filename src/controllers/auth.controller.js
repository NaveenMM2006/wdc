import {comparePassword, hashPassword} from "../utils/hashPassword.js";
import {createFaculty, findFacultyByEmail} from "../services/auth.service.js";
import pool from "../config/db.js";
import { generateToken } from "../utils/generateToken.js";


export const register =async (req,res)=>{
    try {
        const {name, email, password, contact, qualification } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: "name, email and password fields are required",});
        }

        const [existing]= await pool.query(
            "SELECT id from faculties WHERE email = ?",[email]
        );

        if(existing.length > 0){
            return res.status(400).json({message : "User already exists"});
        }

        const passwordHash=await hashPassword(password);

        const userId = await createFaculty({
            name,
            email,
            passwordHash,
            contact,
            qualification,
        });

        res.status(201).json({message:"Faculty registered successfully", userId,});
    } catch (error) {
        console.log(error);
        res.status(500).json({ message : "Server error"});
    }
};

export const login = async (req,res)=>{
    try {
        const {name,email,password}= req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Email and password required"});
        }

        const faculty = await findFacultyByEmail(email);

        if(!faculty){
            return res.status(400).json({message : " Invalid credentials"});
        }

        const isMatch= await comparePassword(password,faculty.password_hash);

        if(!isMatch){
            return res.status(400).json({message: "Incorrect password"});
        }

        const token = generateToken(faculty);

        res.json({
            message: "Login Successful",
            token,
            faculty:{
                id: faculty.id,
                name: faculty.name,
                email: faculty.email,
                role: faculty.role_name,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "server error",
        });
    }
};