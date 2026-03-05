import pool from "../config/db.js";

const testDB = async ()=>{
    try {
        const [rows]= await pool.query("SELECt 1+1 AS result");
        console.log("DataBased connected");
    } catch (error) {
        console.error("DB connection Failed:", error);
    }
};

export default testDB;