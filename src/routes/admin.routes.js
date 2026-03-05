import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorizeRole } from "../middleware/role.middleware.js";
import { getFaculties,updateFacultyByAdmin, deleteFacultyByAdmin,resetPasswordByAdmin} from "../controllers/admin.controller.js";

const router = express.Router();

router.get(
  "/faculties",
  authenticate,
  authorizeRole("SUPER_ADMIN"),
  getFaculties
);
router.put(
  "/faculties/:id",
  authenticate,
  authorizeRole("SUPER_ADMIN"),
  updateFacultyByAdmin
);

router.delete(
  "/faculties/:id",
  authenticate,
  authorizeRole("SUPER_ADMIN"),
  deleteFacultyByAdmin
);

router.put(
  "/faculties/:id/reset-password",
  authenticate,
  authorizeRole("SUPER_ADMIN"),
  resetPasswordByAdmin
);

export default router;