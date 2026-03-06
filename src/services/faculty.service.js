import pool from "../config/db.js";
import bcrypt from "bcrypt";

export const getFacultyById = async (facultyId) => {
  const [rows] = await pool.query(
    `SELECT f.id, f.name, f.email, f.contact, 
            f.qualification, f.profile_photo, r.name AS role
     FROM faculties f
     JOIN roles r ON f.role_id = r.id
     WHERE f.id = ?`,
    [facultyId]
  );

  return rows[0]; // return single faculty
};

export const updateFacultyProfile = async (
  facultyId,
  {contact, qualification, profile_photo}
)=>{
  const [result] = await pool.query(
    `UPDATE faculties SET contact = ?, qualification = ?, profile_photo = ?
    WHERE id = ?`,
    [contact, qualification, profile_photo, facultyId]
  );
  
  return result.affectedRows;
}


// export const getAllFaculties = async ()=>{
//   const [rows] = await pool.query(
//     `SELECT f.id, f.name, f.email, f.contact, f.qualification, r.name AS role From faculties f JOIN roles r ON f.role_id = r.id`
//   );
//   return rows;
// };
export const getAllFaculties = async ({
  page = 1,
  limit = 10,
  search = "",
}) => {
  const offset = (page - 1) * limit;

  const [rows] = await pool.query(
    `SELECT f.id, f.name, f.email, f.contact,
            f.qualification, r.name AS role
     FROM faculties f
     JOIN roles r ON f.role_id = r.id
     WHERE f.name LIKE ?
        OR f.email LIKE ?
     ORDER BY f.created_at DESC
     LIMIT ? OFFSET ?`,
    [`%${search}%`, `%${search}%`, Number(limit), Number(offset)]
  );

  const [countResult] = await pool.query(
    `SELECT COUNT(*) as total
     FROM faculties
     WHERE name LIKE ? OR email LIKE ?`,
    [`%${search}%`, `%${search}%`]
  );

  return {
    data: rows,
    total: countResult[0].total,
    page: Number(page),
    limit: Number(limit),
  };
};

export const adminUpdateFaculty = async (id, data) => {
  const { name, contact, qualification } = data;

  const [result] = await pool.query(
    `UPDATE faculties
     SET name = ?, contact = ?, qualification = ?
     WHERE id = ?`,
    [name, contact, qualification, id]
  );

  return result.affectedRows;
};

export const deleteFaculty = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM faculties WHERE id = ?`,
    [id]
  );

  return result.affectedRows;
};





export const resetFacultyPassword = async (id, newPassword) => {
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  const [result] = await pool.query(
    `UPDATE faculties SET password_hash = ? WHERE id = ?`,
    [hashedPassword, id]
  );

  return result.affectedRows;
};