import {  getFacultyById, updateFacultyProfile } from "../services/faculty.service.js";
import pool from "../config/db.js";

export const getMyProfile = async (req, res) => {
  try {
    const facultyId = req.user.id;

    const faculty = await getFacultyById(facultyId);

    if (!faculty) {
      return res.status(404).json({
        message: "Faculty not found",
      });
    }

    res.json(faculty);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export const updateMyProfile = async (req, res ) =>{
  try {
    const facultyId= req.user.id;
    const {contact, qualification, profile_photo} = req.body;

      const updated = await updateFacultyProfile(facultyId,{
        contact,
        qualification,
        profile_photo,
      });

      if(!updated){
      return res.status(404).json({
      message : "Faculty not found",
      });
      }

      res.json({message: "Profile updated successfully"});
  } catch (error) {
    console.log(error);
    return res.status(500)({
      message: "Server error",
    });
  }
};


export const uploadProfilePhoto = async (req, res) => {
  try {
    const facultyId = req.user.id;

    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const photoPath = `/uploads/${req.file.filename}`;

    await pool.query(
      `UPDATE faculties SET profile_photo = ? WHERE id = ?`,
      [photoPath, facultyId]
    );

    res.json({
      message: "Profile photo uploaded successfully",
      profile_photo: photoPath,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
};