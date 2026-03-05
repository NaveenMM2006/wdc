import { getAllFaculties } from "../services/faculty.service.js";

export const getFaculties = async (req, res) => {
  try {
    const { page, limit, search } = req.query;

    const result = await getAllFaculties({
      page,
      limit,
      search,
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFacultyByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await adminUpdateFaculty(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({ message: "Faculty updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteFacultyByAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await deleteFaculty(id);

    if (!deleted) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({ message: "Faculty deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const resetPasswordByAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { newPassword } = req.body;

    const updated = await resetFacultyPassword(id, newPassword);

    if (!updated) {
      return res.status(404).json({ message: "Faculty not found" });
    }

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};