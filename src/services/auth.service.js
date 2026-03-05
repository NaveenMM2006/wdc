import pool from "../config/db.js";

export const createFaculty = async ({
    name,
    email,
    passwordHash,
    contact,
    qualification,
})=>{
    const [roles] = await pool.query(
        "SELECT id FROM roles WHERE name = 'FACULTY'"
    );

    if(roles.length === 0){
        throw new Error("FACULTY role not found");
    }

    const roleId = roles[0].id;

    const [result] = await pool.query(
        `INSERT INTO faculties (name,email,password_hash,contact,qualification,role_id) VALUES (?, ?, ?, ?, ?, ?)`,
        [name, email, passwordHash, contact, qualification, roleId]
    );

    return result.insertId;
};

export const findFacultyByEmail = async (email) => {
    const [rows] = await pool.query(
    `SELECT f.*, r.name AS role_name
     FROM faculties f
     JOIN roles r ON f.role_id = r.id
     WHERE f.email = ?`,
    [email]
    );

    return rows[0];
}