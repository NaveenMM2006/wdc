import pool from "../config/db.js";


export const createNotice = async ({title, content, created_by}) =>{
    const [result] = await pool.query(
        `INSERT INTO notices (title, content, created_by) VALUES (?, ?, ?)`,
        [title, content, created_by]
    );

    return result.insertId;
};

export const getAllNotices = async ()=>{
    const [rows] = await pool.query(
        `SELECT n.id, n.title, n.content, n.created_by, n.updated_at, f.name AS created_by
        FROM notices n JOIN faculties f ON n.created_by = f.id ORDER BY n.created_at DESC`
    );

    return rows;
};

export const updateNotice = async (id,{title,content}) => {
    const [result] = await pool.query(
        `UPDATE notices
         SET title=?,content=?
         WHERE id= ?`,
         [title,content,id]
    );

    return result.affectedRows;
}

export const deleteNotice = async (id) =>{
    const [result]=await pool.query(
        `DELETE FROM notices WHERE id=?`,[id]
    );

    return result.affectedRows;
}